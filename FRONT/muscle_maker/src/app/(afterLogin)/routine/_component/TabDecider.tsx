"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MonthCalendar from "../../_component/MonthCalendar";
import dayjs from "dayjs";
import WeeklyComponent from "../../_component/WeeklyCalendar";


const today = dayjs().format('YYYY-MM-DD'); 

export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <WeeklyComponent/>;
  }
  return <MonthCalendar />;
}
