"use client";
import YourComponent from '../_lib/getPostRecommend';
import Post from "@/app/(afterLogin)/_component/Post";
import { ReactNode } from "react";

type Props = { params: any; modal: ReactNode };

const YourContainer: React.FC<Props> = ({ params, modal }) => {
  return (
    <div>
      <h2>Post Recommendations</h2>
      <YourComponent />
    </div>
  );
};

export default YourContainer;
