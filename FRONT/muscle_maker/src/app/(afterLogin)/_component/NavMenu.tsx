"use client";

import style from "@/app/(afterLogin)/_component/navMenu.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import routine from "@/asset/routine.svg";
import recommend from "@/asset/recommend.svg";
import club from "@/asset/clue.svg";
import { useEffect, useState } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { notificationAPI } from "@/app/apis/api/notification";
import navBarStore from "@/store/navBarStore";
import mynavBarStore from "@/store/myNavBarStore";

export default function NavMenu() {
  const { notifications, setNotifications, canChange } = useNotificationStore();
  const { navBar, setNavBar } = navBarStore();
  const { navBar: mynavBar, setNavBar: mysetNavBar } = mynavBarStore();
  interface notification {
    notificationId: number;
    message: string;
    isRead: boolean;
    notificationType: string;
    senderId: number;
    sendUserId: number;
  }

  useEffect(() => {
    const eventSource = new EventSource(
      "https://back.muscle-maker.site/notification/subscribe/" +
        localStorage.getItem("userId"),
      {
        withCredentials: true,
      }
    );

    eventSource.onopen = () => {
      console.log("connection 성공");

      try {
        const response = notificationAPI.getNotification(
          localStorage.getItem("userId")
        );
        console.log(response);
      } catch (e) {
        console.log(e);
        eventSource.close();
      }
    };

    eventSource.onmessage = (event) => {
      if (event.data.includes("EventStream Created.")) {
        console.log(event);
        return;
      }

      if (canChange) {
        // const response: notification[] = JSON.parse(event.data);
        let response: notification[] = JSON.parse(event.data);
        // senderUserId가 없는 경우를 대비하여 기본값을 설정
        response = response.map((notif) => ({
          ...notif,
          senderUserId: notif.sendUserId ?? 0, // 예시: 기본값으로 0을 사용
        }));
        setNotifications(response);
        console.log(response);
      }
    };

    eventSource.onerror = (error) => {
      console.log(error);
      eventSource.close();
    };

    return () => {
      console.log("unmounted");
      eventSource.close;
    };
  }, []);

  const onClickButton = (button: string) => {
    setNavBar(button);
  };

  const sendMyNav = (button: string) => {
    mysetNavBar(button);
  };

  return (
    <>
      <li>
        <div
          className={style.homeTab}
          onClick={() => {
            onClickButton("feed");
          }}
        >
          <Link href="/home">
            {navBar === "feed" && (
              <div className={style.navPill}>
                <svg
                  width={26}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
                >
                  <g>
                    <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                  </g>
                </svg>
                <div style={{ fontWeight: "bold" }}>피드</div>
              </div>
            )}
            {navBar !== "feed" && (
              <div
                className={style.navPill}
                style={{ opacity: 0.5, fontWeight: "normal" }}
              >
                <svg
                  width={26}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
                >
                  <g>
                    <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                  </g>
                </svg>
                <div style={{ fontWeight: "bold", color: "gray" }}>피드</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div
          className={style.notificationTab}
          onClick={() => {
            onClickButton("notification");
          }}
        >
          <Link href="/notification">
            {navBar === "notification" && (
              <div className={style.navPill}>
                <img src="/bell.png" className={style.bellImg}></img>
                <div
                  className={style.circle}
                  style={{
                    display: notifications.length === 0 ? "none" : "block",
                  }}
                ></div>
                {notifications.length === 0 ? (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                )}
                <div style={{ fontWeight: "bold" }}>알림</div>
              </div>
            )}
            {navBar !== "notification" && (
              <div className={style.navPill} style={{ opacity: 0.5 }}>
                <img src="/bell.png" className={style.bellImg}></img>
                <div
                  className={style.circle}
                  style={{
                    display: notifications.length === 0 ? "none" : "block",
                  }}
                ></div>
                {notifications.length === 0 ? (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                ) : (
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                )}
                <div style={{ fontWeight: "bold", color: "gray" }}>알림</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div
          className={style.recommendTab}
          onClick={() => {
            onClickButton("recommend");
          }}
        >
          <Link href="/recommend">
            {navBar === "recommend" && (
              <div className={style.navPill}>
                <Image
                  src={recommend}
                  alt="recommend_icon"
                  width={25}
                  height={25}
                />
                <div style={{ fontWeight: "bold" }}>추천</div>
              </div>
            )}
            {navBar !== "recommend" && (
              <div className={style.navPill} style={{ opacity: 0.5 }}>
                <Image
                  src={recommend}
                  alt="recommend_icon"
                  width={25}
                  height={25}
                />
                <div style={{ fontWeight: "bold", color: "gray" }}>추천</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div
          className={style.routineTab}
          onClick={() => {
            sendMyNav("myroutine");
          }}
        >
          <Link href="/mypage/routine">
            {navBar === "routine" && (
              <div className={style.navPill}>
                <Image
                  src={routine}
                  alt="routine_icon"
                  width={25}
                  height={25}
                />
                <div style={{ fontWeight: "bold" }}>루틴</div>
              </div>
            )}
            {navBar !== "routine" && (
              <div
                className={style.navPill}
                style={{ opacity: 0.5, fontWeight: "normal" }}
              >
                <Image
                  src={routine}
                  alt="routine_icon"
                  width={25}
                  height={25}
                />
                <div style={{ fontWeight: "bold", color: "gray" }}>루틴</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div
          className={style.clubTab}
          onClick={() => {
            sendMyNav("myclub");
          }}
        >
          <Link href="mypage/club">
            {navBar === "club" && (
              <div className={style.navPill}>
                <Image src={club} alt="club_icon" width={25} height={25} />
                <div style={{ fontWeight: "bold" }}>클럽</div>
              </div>
            )}
            {navBar !== "club" && (
              <div className={style.navPill} style={{ opacity: "0.5" }}>
                <Image src={club} alt="club_icon" width={25} height={25} />
                <div style={{ fontWeight: "bold", color: "gray" }}>클럽</div>
              </div>
            )}
          </Link>
        </div>
      </li>
    </>
  );
}
