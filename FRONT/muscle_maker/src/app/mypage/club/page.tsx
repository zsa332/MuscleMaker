"use client";

import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import { users } from "@/app/apis/api/user";
import { joinClubStore } from "@/store/joinClub";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "@/app/mypage/club/club.module.css";
import { useRouter } from "next/navigation";

export default function MyClubs() {
  const { myclubs, setClubs } = joinClubStore();
  const [userId, setUserId] = useState<number>(0);
  const router = useRouter();
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
        if (typeof window !== "undefined") {
          const storedUserId = global?.localStorage?.getItem("userId");
          if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
          }
        }

        const response = await axios.get(
          `https://back.muscle-maker.site/users/clubs?userId=${userId}`
        );
        // 응답에서 클럽 데이터를 상태에 저장
        const clubResponse: Club[] = response.data.data;
        console.log(clubResponse)
        setClubs(clubResponse);
      } catch (error) {
        console.error("클럽 데이터 조회 중 오류 발생:", error);
      }
    };

    fetchClubs();
  }, [userId]);

  return (
    <>
      <TopProfile />
      <div className={style.homeText}></div>
      {myclubs.map((club) => (
        <div
          key={club.clubId}
          className={style.clubContainer}
          style={{ backgroundImage: `url(${club.image})`}}
          onClick={() => {
            router.push(`/club/${club.clubId}`);
          }}
        >
          <p className={style.clubTitle}>{club.title}</p>
          <p className={style.clubOtherElse}>
            멤버 {club.memberCnt}명 &nbsp;&nbsp;&nbsp;{club.level}레벨
          </p>
        </div>
      ))}
    </>
  );
}
