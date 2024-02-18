"use client";

import TopProfile from "@/app/userpage/[userId]/_component/TopProfile";
import { users } from "@/app/apis/api/user";
import { joinClubStore } from "@/store/joinClub";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "@/app/mypage/club/club.module.css";
import { useRouter } from "next/navigation";

type Props = {
  params: { userId: string };
};

export default function MyClubs({ params }: Props) {
  const { myclubs, setClubs } = joinClubStore();
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
        const response = await axios.get(
          `https://back.muscle-maker.site/users/clubs?userId=${params.userId}`
        );
        // 응답에서 클럽 데이터를 상태에 저장
        const clubResponse: Club[] = response.data.data;
        setClubs(clubResponse);
      } catch (error) {
        console.error("클럽 데이터 조회 중 오류 발생:", error);
      }
    };

    fetchClubs();
  }, []);

  if (myclubs.length === 0) {
    return (
      <>
        <TopProfile paramsUserId={params.userId} />
        <h1 style={{ textAlign: "center" }}>가입된 클럽이 없습니다.</h1>
      </>
    );
  }

  return (
    <>
      <TopProfile paramsUserId={params.userId} />
      <div className={style.homeText}></div>
      {myclubs.map((club) => (
        <div
          key={club.clubId}
          className={style.clubContainer}
          style={{ backgroundImage: `url(${club.image})` }}
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
