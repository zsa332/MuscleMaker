"use client";

import style from "./mypost.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Image from "next/image";
import Youjin from "@/asset/youjin.jpg";
import chaewon from "@/asset/chaewon.jpg";
import { useState } from "react";
import { homeStore } from "@/store/homeStore";
import { useRouter } from "next/navigation";

// import ActionButtons from
dayjs.locale("ko");
dayjs.extend(relativeTime);

// Post 컴포넌트 파일에서
interface PostProps {
  post: {
    feedId: number;
    userId: number;
    clubId: number;

    content: string;
    nickname: string | null; // nickname이 null일 수도 있으므로 string | null로 타입 지정
    userImgUrl: string | null; // userImgUrl이 null일 수도 있으므로 string | null로 타입 지정
    imgUrl: string; // imgUrl은 항상 문자열이지만, 없을 수도 있는 경우 string | null로 지정 가능
    commentCnt: number;
    favoriteCnt: number;
    visibility: number;
    flag: boolean;
    tags: string[]; // tags는 문자열 배열
    createDate: string; // 날짜와 시간을 나타내므로 string 타입으로 지정
    updateDate: string | null; // updateDate가 null일 수도 있으므로 string | null로 타입 지정
    favorite: boolean;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const [selectPost, setSelectPost] = useState(0);
  // Post 컴포넌트의 내용
  return (
    <div
      className={style.post}
      onClick={() => {
        homeStore.getState().setCanChange(true, post.feedId);
        router.push("/home");
      }}
    >
      <div
        className={style.postImage}
        style={{
          backgroundImage: `url(${post.imgUrl})`,
          width: "329.1px",
          height: "325px",
        }}
        onMouseOver={() => {
          setSelectPost(post.feedId);
        }}
        onMouseOut={() => {
          setSelectPost(0);
        }}
      >
        {selectPost === post.feedId && (
          <div className={style.postWrapper}>
            <div style={{ fontSize: "24px" }}>&#x2764; </div>
            <div style={{ fontSize: "17px" }}>
              {post.favoriteCnt}&nbsp;&nbsp;
            </div>
            <img
              src="/comment_icon.png"
              style={{ marginTop: "6px", height: "24px", width: "20px" }}
            ></img>
            <div style={{ fontSize: "17px" }}>{post.commentCnt}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
