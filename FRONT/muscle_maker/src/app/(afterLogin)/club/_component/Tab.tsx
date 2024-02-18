"use client";
import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";
import Image from "next/image";
import { useEffect } from "react";
import { clubs } from "@/app/apis/api/clubapi";
import { useState } from "react";
import { joinClubStore } from "@/store/joinClub";
import axios from "axios";
import UserService from "@/app/apis/service/userservice";
import { users } from "@/app/apis/api/user";
import { useRouter } from "next/navigation";

interface ClubPageProps {
  clubId: number; // clubId의 타입을 명시적으로 지정
}
export default function Tab({ clubId }: ClubPageProps) {
  const { tab, setTab } = useContext(TabContext);
  const [club, setClub] = useState<Club | null>(null);
  const { myclubs, setClubs } = joinClubStore();
  const [userId, setUserId] = useState<number>(0);
  const [isDropdownView, setDropdownView] = useState(false);
  const router = useRouter();

  const onClickHome = () => {
    setTab("home");
  };
  const onClickMem = () => {
    setTab("mem");
  };
  const onClickFeed = () => {
    setTab("feed");
  };

  interface Club {
    clubId: number;
    title: string;
    goal: string;
    category: boolean; // '헬스' 또는 '식단'과 같은 문자열을 받을 수 있도록 변경
    memberCnt: number;
    level: number;
    image: string; // 클럽 이미지 URL
    exp: number;
    successDays: number;
  }

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `https://back.muscle-maker.site/users/clubs?userId=${userId}`
        );
        // 응답에서 클럽 데이터를 상태에 저장
        const clubResponse: Club[] = response.data.data;
        setClubs(clubResponse);
      } catch (error) {
        console.error("클럽 데이터 조회 중 오류 발생:", error);
      }
    };

    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const storedUserId = localStorage?.getItem("userId");
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        }
      }

      const response = await clubs.getClubInfo(clubId);
      const club: Club = response.data.data;

      setClub(club);
    };

    fetchData();
    fetchClubs();
  }, [clubId, userId]);

  const handleClickMenu = () => {
    setDropdownView(!isDropdownView)
  }

  const onClickLeave = () => {
    const func = async() => {
      try {
        const response = await users.leaveClub(userId, clubId);
        alert(response.data.message)
      } catch (error) {
        console.error("Error in leaveClub:", error);
        throw error;
      }
    }

    func();
  }

  const onClickJoin = () => {
    const clubTransitRequest = {
      "clubId" : clubId,
      "userId" : userId
    }

    const func = async() => {
      try {
        const response = await users.applyClub(clubTransitRequest);
        alert(response.data.message)
      } catch (error) {
        alert("이미 클럽에 가입 신청했습니다. 가입 승낙을 기다리세요!!")
      }
    }

    func();
  }

  return (
    <div className={style.homeFixed}>
      <div className={style.clubContainer}
        style={{ backgroundImage: `url(${club===null? "aaa" : club.image})`, width : '650px', height: '200px'}}>
          <div style={{width:'28%'}}>
            <img className = {style.levelCircle} src = {club===null?"/level0.png": "/level"+club.level+".png"}></img>
          </div>
          <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <p className={style.clubTitle}>{club===null? "제목 없음" : club.title}</p>
            <div className={style.else}>
              <p className={style.clubOtherElse}>
                <img style={{width:'21px'}} src = "/target_icon.png"></img>
                {club?.goal}
                <img style={{width:'21px'}} src = "/target_icon.png"></img>
              </p>
            </div>
          </div>
          <div style={{position:'relative', display:'flex', flexDirection:'column'}}>
            <div style={{width:'100%',  textAlign: 'left'}}>
              <img src = "/menu_icon.png" style={{width:'35px', opacity:0.5, cursor: 'pointer'}}
                onClick={handleClickMenu}
              ></img>
            </div>
          </div>
          {isDropdownView && 
                <div style={{}} className={style.menu}>
                  <div style={{ padding: 0, margin: '15px', listStyleType:'none'}}>
                    <span style = {{ cursor:'pointer', color: 'rgb(255,255,255,0.7)', display : (myclubs.some(x => x.clubId === clubId))?'block':'none'}} onClick={onClickLeave}>탈퇴하기</span>
                    <span style = {{ cursor:'pointer', color: 'rgb(255,255,255,0.7)', display : (myclubs.some(x => x.clubId === clubId))?'none':'block'}} onClick={onClickJoin}>가입하기</span>
                  </div>
                </div>
            }
        </div>
      <div className={style.homeTab}>
        <div onClick={onClickHome}>
          클럽 홈
          <div
            className={style.tabIndicator}
            hidden={tab === "mem" || tab === "feed"}
          ></div>
        </div>
        <div onClick={onClickMem}>
          멤버
          <div
            className={style.tabIndicator}
            hidden={tab === "home" || tab === "feed"}
          ></div>
        </div>
        <div onClick={onClickFeed}>
          피드
          <div
            className={style.tabIndicator}
            hidden={tab === "home" || tab === "mem"}
          ></div>
        </div>
      </div>
    </div>
  );
}
