"use client";
import Tab from "../_component/Tab";
import TabProvider from "../_component/TabProvider";
import TabDecider from "../_component/TabDecider";
import style from "@/app/(afterLogin)/club/[clubId]/club.module.css";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface ClubPageProps {
  clubId: number; // clubId의 타입을 명시적으로 지정
}
export default function ClubPage({ params }: { params: { clubId: string } }) {
  return (
    <>
      <div className={style.pagebackgroundcolor}>
        <div>
          <TabProvider>
            <Tab clubId={parseInt(params.clubId, 10)} />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <TabDecider clubId={parseInt(params.clubId, 10)} />
          </TabProvider>
        </div>
      </div>
    </>
  );
}
