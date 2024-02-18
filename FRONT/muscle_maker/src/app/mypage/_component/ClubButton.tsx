"use client";
import { useState } from "react";
import style from "@/app/mypage/_component/clubButton.module.css";
import Image from "next/image";
import club from "@/asset/clue.svg";
import Link from "next/link";
import clubadd from "@/asset/clubadd.svg";
import clubmanage from "@/asset/clubmanage.svg";
import mynavBarStore from "@/store/myNavBarStore";

export function ClubButton() {
  const [check, setCheck] = useState<boolean>(false);
  const { navBar, setNavBar } = mynavBarStore();

  const toggleCheck = () => {
    setCheck(!check);
  };
  const onClickButton = (button: string) => {
    setNavBar(button);
    setCheck(!check);
  };
  return (
    <>
      <li>
        <div className={style.navPill} onClick={() => onClickButton("myclub")}>
          {navBar === "myclub" && (
            <>
              <Image src={club} alt="clubmanage" width={25} height={25} />
              <div style={{ fontWeight: "bold" }}>
                클럽
                {!check && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                  </svg>
                )}
                {check && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
                  </svg>
                )}
              </div>
            </>
          )}
          {navBar !== "myclub" && (
            <>
              <Image
                src={club}
                alt="clubmanage"
                width={25}
                height={25}
                style={{ opacity: 0.5, fontWeight: "normal" }}
              />
              <div style={{ opacity: 0.5, fontWeight: "bolder" }}>
                클럽
                {!check && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                  </svg>
                )}
                {check && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
                  </svg>
                )}
              </div>
            </>
          )}
        </div>
      </li>
      {check && (
        <li>
          &nbsp;&nbsp;
          <Link href="/mypage/club">
            <div className={style.clubPill}>
              <Image src={clubmanage} alt="clubmanage" width={20} height={20} />
              <div style={{ fontWeight: "bold" }}>클럽관리</div>
            </div>
          </Link>
        </li>
      )}
      {check && (
        <li>
          &nbsp;&nbsp;
          <Link href="/mypage/compose/upload">
            <div className={style.clubPill}>
              <Image src={clubadd} alt="clubadd" width={20} height={20} />
              <div style={{ fontWeight: "bold" }}>클럽생성</div>
            </div>
          </Link>
        </li>
      )}
    </>
  );
}
