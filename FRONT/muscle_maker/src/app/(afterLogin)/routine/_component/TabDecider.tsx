"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MonthCalendar from "./MonthCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
import dayjs from "dayjs";
import style from './tab.module.css'



const today = dayjs().format('YYYY-MM-DD'); 

export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <WeeklyCalendar startDate={today} />;
  }
  return <MonthCalendar />;
}
