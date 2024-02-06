"use client";
import YourComponent from '../_lib/getPostFollowing';
import Post from "@/app/(afterLogin)/_component/Post";
import { ReactNode } from "react";

type Props = { params: any; modal: ReactNode };

const YourContainer: React.FC<Props> = ({ params, modal }) => {
  return (
    <div>
      <h2>Following </h2>
      <YourComponent />
    </div>
  );
};

export default YourContainer;
