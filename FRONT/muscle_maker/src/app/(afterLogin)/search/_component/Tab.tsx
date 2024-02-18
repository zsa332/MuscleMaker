"use client";
import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);

  const onClickTab = (selectedTab: "club" | "user" | "tag") => {
    // 매개변수에 타입 지정
    setTab(selectedTab);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}></div>
      <div className={style.homeTab}>
        <div onClick={() => onClickTab("club")}>
          클럽
          <div className={style.tabIndicator} hidden={tab !== "club"}></div>
        </div>
        <div onClick={() => onClickTab("user")}>
          사용자
          <div className={style.tabIndicator} hidden={tab !== "user"}></div>
        </div>
        <div onClick={() => onClickTab("tag")}>
          테그
          <div className={style.tabIndicator} hidden={tab !== "tag"}></div>
        </div>
      </div>
    </div>
  );
}
