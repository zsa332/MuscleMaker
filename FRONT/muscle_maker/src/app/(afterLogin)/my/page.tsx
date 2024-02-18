"use client";

import UserService from "@/app/apis/service/userservice";
import style from "./mypage.module.css";
import { useRouter } from "next/navigation";
import { data } from "@/app/mypage/report/_component/WeightChart";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import mynavBarStore from "@/store/myNavBarStore";

interface UserData {
  image: string;
  nickname: string;
  emailId: string;
}

export default function Mypage() {
  const { navBar, setNavBar } = mynavBarStore();
  const router = useRouter();
  const [response, setResponse] = useState<UserData | null>(null);

  useEffect(() => {
    // useEffect 내부에서 비동기 함수 호출
    UserService.getMyUserInfo()
      .then((data) => {
        console.log(data);
        setResponse(data.data);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 설정

  const goToMyPage = () => {
    setNavBar("myfeed");
    router.push("/../../mypage/myfeed");
  };

  return (
    <button className={style.mypageButton} onClick={goToMyPage}>
      {response && ( // response가 null이 아닌 경우에만 아래 내용을 렌더링
        <>
          <div className={style.mypageUserImage}>
            <img src={response.image} alt={response.nickname} />
          </div>
          <div className={style.mypageUserName}>
            <div>{response.nickname}</div>
            <div>{response.emailId}</div>
          </div>
        </>
      )}
    </button>
  );
}
