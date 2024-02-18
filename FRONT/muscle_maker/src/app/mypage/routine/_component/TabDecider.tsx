"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MonthCalendar from "@/app/(afterLogin)/_component/MonthCalendar";
import WeeklyComponent from "@/app/(afterLogin)/_component/WeeklyCalendar";
import RoutineCart from "./RoutineCart";


export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "week") {
    return (
      <>
      <WeeklyComponent/>
      </>
    )
  }
  else if (tab === 'month') {
    return <MonthCalendar />;
  }
  return <RoutineCart />;
}

