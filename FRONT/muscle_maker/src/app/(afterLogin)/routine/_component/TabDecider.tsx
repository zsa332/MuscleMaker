"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MonthCalendar from "./MonthCalendar";
import dayjs from "dayjs";
import style from './tab.module.css'
import WeeklyComponent from "./ExerciseList";



const today = dayjs().format('YYYY-MM-DD'); 

export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <WeeklyComponent/>;
  }
  return <MonthCalendar />;
}
