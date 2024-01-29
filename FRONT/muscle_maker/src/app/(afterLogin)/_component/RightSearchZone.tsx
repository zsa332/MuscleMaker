"use client";
import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SearchForm from "./SearchForm";
import TrendSection from "./TrendSection";

export default function RightSearchZone() {
  return (
    <div>
      <SearchForm />
      <br></br>
      <br></br>
      <br></br>
      <TrendSection />
    </div>
  );
}
