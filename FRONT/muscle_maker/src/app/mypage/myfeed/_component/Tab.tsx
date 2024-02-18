"use client";
import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  const onClickDiet = () => {
    setTab("diet");
  };
  const onClickExercise = () => {
    setTab("exercise");
  };
  const onClickAll = () => {
    setTab("all");
  };
  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}></div>
      <div className={style.homeTab}>
        <div onClick={onClickDiet}>
          식단
          <div
            className={style.tabIndicator}
            hidden={tab === "exercise" || tab === "all"}
          ></div>
        </div>
        <div onClick={onClickExercise}>
          운동
          <div
            className={style.tabIndicator}
            hidden={tab === "diet" || tab === "all"}
          ></div>
        </div>
        <div onClick={onClickAll}>
          전체
          <div
            className={style.tabIndicator}
            hidden={tab === "diet" || tab === "exercise"}
          ></div>
        </div>
      </div>
    </div>
  );
}
