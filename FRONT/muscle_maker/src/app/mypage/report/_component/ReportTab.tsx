"use client";
import style from "./reportTab.module.css";
import { useState, useEffect } from "react";

export default function Tab() {
  const [report, setReport] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      const scrolly = window.scrollY;

      if (scrolly <= 500) {
        setReport("all");
      } else if (scrolly > 500 && scrolly <= 1200) {
        setReport("weight");
      } else if (scrolly > 1200 && scrolly <= 1750) {
        setReport("muscle");
      } else if (scrolly > 1750 && scrolly <= 2100) {
        setReport("fat");
      }
    };

    window.addEventListener("scroll", handleScroll);
  });

  const onClickAll = () => {
    setReport("all");
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };
  const onClickWeight = () => {
    setReport("weight");
    window.scrollTo({
      top: 730,
      behavior: "smooth",
    });
  };
  const onClickMuscle = () => {
    setReport("muscle");
    window.scrollTo({
      top: 1320,
      behavior: "smooth",
    });
  };
  const onClickFat = () => {
    setReport("fat");
    window.scrollTo({
      top: 2100,
      behavior: "smooth",
    });
  };
  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>&nbsp;</div>
      <div className={style.homeTab}>
        <div onClick={onClickAll}>
          분석표
          <div
            className={style.tabIndicator}
            hidden={
              report === "weight" || report === "muscle" || report === "fat"
            }
          ></div>
        </div>
        <div onClick={onClickWeight}>
          체중 그래프
          <div
            className={style.tabIndicator}
            hidden={report === "all" || report === "muscle" || report === "fat"}
          ></div>
        </div>
        <div onClick={onClickMuscle}>
          골격근량 그래프
          <div
            className={style.tabIndicator}
            hidden={report === "weight" || report === "all" || report === "fat"}
          ></div>
        </div>
        <div onClick={onClickFat}>
          체지방 그래프
          <div
            className={style.tabIndicator}
            hidden={
              report === "weight" || report === "muscle" || report === "all"
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
