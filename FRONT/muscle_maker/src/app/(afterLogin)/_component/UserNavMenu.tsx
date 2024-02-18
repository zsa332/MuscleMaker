"use client";

import style from "./myNavMenu.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import routine from "@/asset/routine.svg";
import clubmanage from "@/asset/clubmanage.svg";
import { useSearchParams } from "next/navigation";
import usernavBarStore from "@/store/userNavBarStore";

type Props = {
  userId: string;
};

export default function NavMenu({ userId }: Props) {
  const segment = useSelectedLayoutSegment();
  const [clubSetting, setClueSetting] = useState<boolean>(true);
  const { navBar, setNavBar } = usernavBarStore();
  const onClickClub = () => {
    setClueSetting(!clubSetting);
  };

  useEffect(() => {
    console.log(`myfeed${segment}`);
    console.log(`routine${segment}`);
    console.log(`club${segment}`);
    if (segment === "myfeed") {
      setNavBar("userfeed");
    } else if (segment === "routine") {
      setNavBar("userroutine");
    } else if (segment === "club") {
      setNavBar("userclub");
    }
  }, [segment]);

  return (
    <>
      <li>
        <Link href={`/userpage/${userId}/myfeed`}>
          {navBar === "userfeed" && (
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
          {navBar !== "userfeed" && (
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
              <div style={{ fontWeight: "bold" }}>피드</div>
            </div>
          )}
        </Link>
      </li>
      <li>
        <Link href={`/userpage/${userId}/routine`}>
          {navBar === "userroutine" && (
            <div className={style.navPill}>
              <Image src={routine} alt="routine_icon" width={25} height={25} />
              <div style={{ fontWeight: "bold" }}>루틴</div>
            </div>
          )}
          {navBar !== "userroutine" && (
            <div
              className={style.navPill}
              style={{ opacity: 0.5, fontWeight: "normal" }}
            >
              <Image src={routine} alt="routine_icon" width={25} height={25} />
              <div style={{ fontWeight: "bold" }}>루틴</div>
            </div>
          )}
        </Link>
      </li>
      <li>
        <Link href={`/userpage/${userId}/club`}>
          {navBar === "userclub" && (
            <div className={style.navPill}>
              <Image src={clubmanage} alt="clubmanage" width={25} height={25} />
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>클럽</div>
            </div>
          )}
          {navBar !== "userclub" && (
            <div
              className={style.navPill}
              style={{ opacity: 0.5, fontWeight: "normal" }}
            >
              <Image src={clubmanage} alt="clubmanage" width={25} height={25} />
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>클럽</div>
            </div>
          )}
        </Link>
      </li>
    </>
  );
}
