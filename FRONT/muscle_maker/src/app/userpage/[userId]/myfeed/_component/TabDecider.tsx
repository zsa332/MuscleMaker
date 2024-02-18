"use client";

import style from "@/app/mypage/myfeed/_component/tabDecider.module.css";
import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MyDiet from "./MyDiet";
import MyExercise from "./MyExercise";
import MyAllFeeds from "./MyAllFeeds";

type Props = {
  paramsUserId: string;
};

export default function TabDecider({ paramsUserId }: Props) {
  const { tab } = useContext(TabContext);
  if (tab === "diet") {
    return (
      <div>
        <MyDiet paramsUserId={paramsUserId} />
      </div>
    );
  } else if (tab === "exercise") {
    return (
      <div>
        <MyExercise paramsUserId={paramsUserId} />
      </div>
    );
  }
  return (
    <div>
      <MyAllFeeds paramsUserId={paramsUserId} />
    </div>
  );
}
