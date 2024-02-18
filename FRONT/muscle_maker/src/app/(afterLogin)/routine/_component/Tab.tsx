"use client";

import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";



export default function Tab() {
  const { tab, setTab }  = useContext(TabContext);

  const onClickRec = () => {
    setTab("rec");
  };

  const onClickFol = () => {
    setTab("fol");
  };
  return (
    <div className={style.routinePageFixed}>
      <div className={style.routinePageText} style={{ textAlign: "center" }}>
        루틴
      </div>
      <div className={style.routinePageTab}>
        <div onClick={onClickRec}>
          이번 주
          <div className={style.tabIndicator} hidden={tab === "fol"}></div>
        </div>
        <div onClick={onClickFol}>
          지난 기록
          <div className={style.tabIndicator} hidden={tab === "rec"}></div>
        </div>
      </div>
    </div>
  );
}
