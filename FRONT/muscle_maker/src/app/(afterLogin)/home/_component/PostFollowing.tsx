"use client";
import YourComponent from "../_lib/getPostFollowing";
import Post from "@/app/(afterLogin)/_component/Post";
import { ReactNode } from "react";

const YourContainer = () => {
  return (
    <div>
      <h2>Following </h2>
      <YourComponent />
    </div>
  );
};

export default YourContainer;
