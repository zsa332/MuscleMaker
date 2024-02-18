"use client";
import { useEffect, useState } from "react";
import FollowService from "@/app/apis/service/followservice";
import FeedService from "@/app/apis/service/feedservice";
import style from "./topProfile.module.css";
import Image from "next/image";
import Chaewon from "@/asset/chaewon.jpg";
import UserService from "@/app/apis/service/userservice";
import Link from "next/link";
import FollowModal from "./FollowModal";
import FollowerList from "./FollowerList";
import { useFollowerListStore } from "@/store/FollowerListStore";
import { EmailandPosition } from "@/app/(afterLogin)/_component/TopProfileEmail";

interface Feed {
  nickname: string;
  userImgUrl: string;
}

interface UserData {
  image: string;
  name: string;
  emailId: string;
  nickname: string;
}

export default function TopProfile() {
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [feedCount, setFeedCount] = useState<number>(0);
  const [res, setRes] = useState<{ data: { feeds: Feed[] } }>({
    data: { feeds: [] },
  });
  const [response, setResponse] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string>("0");

  const [isFollowerModalOpen, setFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

  const { followers, setFollowers, followings, setFollowings } =
    useFollowerListStore();

  const onClickFollower = () => {
    setFollowerModalOpen(true);
  };

  const onClickFollowing = () => {
    setFollowingModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserId = localStorage?.getItem("userId");
          if (storedUserId) {
            setUserId(storedUserId);
          }
        }

        const response = await FollowService.getFollowList(userId);
        const { followerList, followingList } = response.data;

        const res = await FeedService.getMyFeed(userId as string);
        const userResponse = await UserService.getMyUserInfo();
        const userData = userResponse.data;
        console.log("Updated UserId:", userId);

        // 모든 데이터를 한 번에 설정
        setResponse(userData);
        setFollowers(followerList);
        setFollowings(followingList);
        setRes(res);
        setFeedCount(res.data.feeds.length);
        setFollowerCount(followerList.length);
        setFollowingCount(followingList.length);
      } catch (error) {
        console.error("팔로워 및 팔로잉 수를 가져오는데 실패했습니다.", error);
        console.log("Updated UserId:", userId);
      }
    };
    fetchData();
  }, [userId]); // userId가 변경될 때마다 useEffect 다시 실행

  return (
    <div className={style.main}>
      {response?.image && (
        <img
          src={response?.image}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />
      )}
      <div className={style.content}>
        <h1>{response?.nickname || "PlzSetNickname"}</h1>
        <div className={style.post}>
          <div>게시물 {feedCount}개</div>
          <div>
            <button onClick={onClickFollower} className={style.FollowBtn}>
              팔로워 {followerCount}명
            </button>

            <FollowModal
              show={isFollowerModalOpen}
              onClose={() => setFollowerModalOpen(false)}
            >
              <FollowerList
                userId={Number(parseInt(userId, 10))}
                whichOpen={true}
              ></FollowerList>
            </FollowModal>
          </div>
          <div>
            <button onClick={onClickFollowing} className={style.FollowBtn}>
              팔로잉 {followingCount}명
            </button>

            <FollowModal
              show={isFollowingModalOpen}
              onClose={() => setFollowingModalOpen(false)}
            >
              <FollowerList
                userId={Number(parseInt(userId, 10))}
                whichOpen={false}
              ></FollowerList>
            </FollowModal>
          </div>
        </div>
        <EmailandPosition userId={userId} />
      </div>
    </div>
  );
}
