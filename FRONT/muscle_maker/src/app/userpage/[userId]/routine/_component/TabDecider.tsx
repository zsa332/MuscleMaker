"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import WeeklyComponent from "./WeeklyCalendar";
import MonthCalendar from "./MonthCalendar";
import dayjs from "dayjs";

type Props = {
  paramsUserId: string;
};

const today = dayjs().format('YYYY-MM-DD'); 

export default function TabDecider({paramsUserId}:Props) {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <WeeklyComponent paramsuserId={paramsUserId}/>;
  }
  return <MonthCalendar paramsuserId={paramsUserId}/>;
}
