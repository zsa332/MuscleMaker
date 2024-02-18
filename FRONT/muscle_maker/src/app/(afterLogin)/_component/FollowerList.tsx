"use client";

import React, { useEffect, useState } from "react";
import { useFollowerListStore } from "@/store/FollowerListStore";
import { fetchFollowData } from "./fackuserdata"; // 실제 경로로 수정 필요
import style from "@/app/(afterLogin)/_component/followerList.module.css"; // CSS 모듈 경로 확인 필요
import FollowButton from "./FollowButton";
import Link from "next/link";

interface FollowerListProps {
  userId: number;
  whichOpen: boolean;
}

const FollowerList: React.FC<FollowerListProps> = ({ userId, whichOpen }) => {
  // 스토어에서 followers와 followings 상태를 가져오고 설정하는 함수를 가져옵니다.
  const { followers, setFollowers, followings, setFollowings } =
    useFollowerListStore();

  return (
    <div>
      {whichOpen && (
        <div>
          <h2 style={{ textAlign: "center" }}>팔로워</h2>
          {followers.map((user) => (
            <div className={style.container} key={user.userId}>
              <Link href={`/userpage/${user.userId}/myfeed`}>
                <img
                  src={user.imgUrl}
                  alt={user.nickname}
                  style={{ width: "45px", height: "45px", margin: "0px" }}
                />
              </Link>
              <div className={style.nicknameDiv}>
                <div className={style.nicknamecontainer}>{user.nickname}</div>
              </div>
              <div
                style={{
                  display: followings.some((x) => x.userId === user.userId)
                    ? "none"
                    : "block",
                  position: "relative",
                }}
              >
                <div
                  style={{ position: "absolute", top: "10px", left: "160px" }}
                >
                  <FollowButton followerId={userId} followingId={user.userId} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!whichOpen && (
        <div>
          <h2 style={{ textAlign: "center" }}>팔로잉</h2>
          {followings.map((user) => (
            <div className={style.container} key={user.userId}>
              <Link href={`/userpage/${user.userId}/myfeed`}>
                <img
                  src={user.imgUrl}
                  alt={user.nickname}
                  className={style.imagecontainer}
                  style={{ width: "45px", height: "45px", margin: "0px" }}
                />
              </Link>
              <div className={style.nicknameDiv}>
                <div className={style.nicknamecontainer}>{user.nickname}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowerList;
