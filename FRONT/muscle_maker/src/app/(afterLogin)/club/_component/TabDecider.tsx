"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import MemberPage from "./member";
import FeedPage from "./Feed";
import CircleChart from "./CircleChart";



export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "home") {
    return (
      <>
      <CircleChart/>
      </>
    )
  }
  else if (tab === 'mem') {
    return <MemberPage />;
  }
  return <FeedPage />;
}
