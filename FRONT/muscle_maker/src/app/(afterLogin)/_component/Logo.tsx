"use client";
import style from "@/app/(afterLogin)/layout.module.css";
import navBarStore from "@/store/navBarStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const { navBar, setNavBar } = navBarStore();

  const onClickButton = (button: string) => {
    setNavBar(button);
    router.push("/home");
  };
  return (
    <div
      className={style.logo}
      // href="/home"
      style={{
        textDecoration: "none",
        marginLeft: "0",
        marginTop: "18px",
      }}
      onClick={() => {
        onClickButton("feed");
      }}
    >
      <div className={style.logoPill}>MUSCLE&nbsp;MAKER</div>
      <div className={style.shortLogo}>MM</div>
    </div>
  );
}
