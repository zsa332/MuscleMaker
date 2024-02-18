"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MemberPage from "./member";
import FeedPage from "./Feed";
import CircleChart from "./CircleChart";
import { useState } from "react";
import { useEffect } from "react";
import { clubs } from "@/app/apis/api/clubapi";


interface ClubPageProps {
  clubId:number; // clubId의 타입을 명시적으로 지정
}
export default function TabDecider({clubId}: ClubPageProps) {
  const { tab } = useContext(TabContext);
  const [clubInfo, setClubInfo] = useState<ClubInfo|null> (null);

  interface calendar{
    date : string;
    achievePercent : number;
  }

  interface ClubInfo {
    exp: number;
    successDays : number;
    completionPercent : number;
    calendarResponses : calendar[];
  }

  useEffect(()=>{
    const fetchData = async () => {
      const now = new Date();

      const response = await clubs.getClubCalendar(clubId, now.getFullYear(), now.getMonth());
      const clubInfo : ClubInfo = response.data.data;
      
      setClubInfo(clubInfo);
    }

    fetchData();
  }, [clubId]);

  if (tab === "home") {
    return (
      <>
      <CircleChart 
        completionPercent={clubInfo===null?0:clubInfo.completionPercent}
        exp ={clubInfo===null?0:clubInfo.exp}
        successDays={clubInfo===null?0:clubInfo.successDays}
        />
      </>
    )
  }
  else if (tab === 'mem') {
    return <MemberPage clubId={clubId}/>;
  }
  return <FeedPage clubId={clubId}/>;
}
