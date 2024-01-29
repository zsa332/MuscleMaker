"use client";

import style from "./trendSection.module.css";
import HashTag from "./HashTag";
import { usePathname } from "next/navigation";

export default function TrendSection() {
  const hashTags = ["#운동", "#갓생", "#식단", "#아이유챌린지", "#아이브_식단"];
  return (
    <div>
      <div>
        <h3>나를 위한 헤시태그</h3>
        {hashTags.map((hashTag, index) => (
          <HashTag hashTag={hashTag} key={index} />
        ))}
      </div>
    </div>
  );
}
