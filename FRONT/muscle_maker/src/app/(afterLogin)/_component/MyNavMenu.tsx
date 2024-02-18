"use client";

import style from "./myNavMenu.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import routine from "@/asset/routine.svg";
import recommend from "@/asset/recommend.svg";
import clue from "@/asset/clue.svg";
import report from "@/asset/report.svg";
import setting from "@/asset/setting.svg";
import clubadd from "@/asset/clubadd.svg";
import clubmanage from "@/asset/clubmanage.svg";
import mynavBarStore from "@/store/myNavBarStore";

export default function NavMenu() {
  const { navBar, setNavBar } = mynavBarStore();
  const [clubSetting, setClueSetting] = useState<boolean>(true);
  const onClickClub = () => {
    setClueSetting(!clubSetting);
  };

  const onClickButton = (button: string) => {
    setNavBar(button);
  };
  return (
    <>
      <li>
        <div onClick={() => onClickButton("myfeed")}>
          <Link href="/mypage/myfeed">
            {navBar === "myfeed" && (
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
                <div style={{ fontWeight: "bold" }}>내 피드</div>
              </div>
            )}
            {navBar !== "myfeed" && (
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
                <div style={{ fontWeight: "bold" }}>내 피드</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div onClick={() => onClickButton("myroutine")}>
          <Link href="/mypage/routine">
            {navBar === "myroutine" && (
              <div className={style.navPill}>
                <Image
                  src={routine}
                  alt="routine_icon"
                  width={25}
                  height={25}
                />
                <div style={{ fontWeight: "bold" }}>루틴 설정</div>
              </div>
            )}
            {navBar !== "myroutine" && (
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
                <div style={{ fontWeight: "bold" }}>루틴 설정</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      <li>
        <div onClick={() => onClickButton("myreport")}>
          <Link href="/mypage/report">
            {navBar === "myreport" && (
              <div className={style.navPill}>
                <Image src={report} alt="report_icon" width={25} height={25} />
                <div style={{ fontWeight: "bold" }}>리포트</div>
              </div>
            )}
            {navBar !== "myreport" && (
              <div
                className={style.navPill}
                style={{ opacity: 0.5, fontWeight: "normal" }}
              >
                <Image src={report} alt="report_icon" width={25} height={25} />
                <div style={{ fontWeight: "bold" }}>리포트</div>
              </div>
            )}
          </Link>
        </div>
      </li>
      {/* <li>
        <Link href="/mypage/purpose">
          <div className={style.navPill}>
            <Image
              src={recommend}
              alt="recommend_icon"
              width={25}
              height={25}
            />
            <div style={{ fontWeight: "bold" }}>목표설정</div>
          </div>
        </Link>
      </li> */}
    </>
  );
}
