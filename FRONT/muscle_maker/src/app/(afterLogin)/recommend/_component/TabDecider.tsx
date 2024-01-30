"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import RecommendGroups from "./RecommendGroups";
import RecommendUsers from "./RecommendUsers";


export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "group") {
    return <RecommendGroups/>;
  }
  return <RecommendUsers />;
}
