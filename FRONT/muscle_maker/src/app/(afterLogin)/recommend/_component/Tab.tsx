"use client";
import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  const onClickGroup = () => {
    setTab("group");
  };
  const onClickUser = () => {
    setTab("user");
  };
  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>&nbsp;</div>
      <div className={style.homeTab}>
        <div onClick={onClickGroup}>
          클럽
          <div className={style.tabIndicator} hidden={tab === "user"} ></div>
        </div>
        <div onClick={onClickUser}>
          유저
          <div className={style.tabIndicator} hidden={tab === "group"}></div>
        </div>
      </div>
    </div>
  );
}
