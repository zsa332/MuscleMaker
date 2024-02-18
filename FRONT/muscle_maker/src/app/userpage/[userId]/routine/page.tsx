import React from "react";
import style from "./routine.module.css";
import TopProfile from "@/app/userpage/[userId]/_component/TopProfile";
import TabProvider from "@/app/userpage/[userId]/routine/_component/TabProvider"
import Tab from "@/app/userpage/[userId]/routine/_component/Tab";
import TabDecider from "@/app/userpage/[userId]/routine/_component/TabDecider"

type Props = {
  params: { userId: string };
};

export default function Routine({ params }: Props) {
  return (
    <div>
      <TopProfile paramsUserId={params.userId} />
      <TabProvider>
        <Tab />
        <br />
        <br />
        <TabDecider paramsUserId={params.userId}/>
      </TabProvider>
    </div>
  );
}
