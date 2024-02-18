"use client";

import style from "@/app/mypage/myfeed/_component/tabDecider.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MyDiet from "./MyDiet";
import MyExercise from "./MyExercise";
import MyAllFeeds from "./MyAllFeeds";

export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "diet") {
    return (
      <div>
        <MyDiet />
      </div>
    );
  } else if (tab === "exercise") {
    return (
      <div>
        <MyExercise />
      </div>
    );
  }
  return (
    <div>
      <MyAllFeeds />
    </div>
  );
}
