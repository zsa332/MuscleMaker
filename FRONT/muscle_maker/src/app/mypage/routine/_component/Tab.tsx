"use client";

import style from "./tab.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  const onClickWeek = () => {
    setTab("week");
  };
  const onClickMonth = () => {
    setTab("month");
  };
  const onClickCart = () => {
    setTab("cart");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}></div>
      <div className={style.homeTab}>
        <div onClick={onClickWeek}>
          이번주
          <div
            className={style.tabIndicator}
            hidden={tab === "month" || tab === "cart"}
          ></div>
        </div>
        <div onClick={onClickMonth}>
          지난 기록
          <div
            className={style.tabIndicator}
            hidden={tab === "week" || tab === "cart"}
          ></div>
        </div>
        <div onClick={onClickCart}>
          장바구니
          <div
            className={style.tabIndicator}
            hidden={tab === "week" || tab === "month"}
          ></div>
        </div>
      </div>
    </div>
  );
}
