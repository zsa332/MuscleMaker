"use client";
import Mypost from "@/app/(afterLogin)/_component/Mypost";
import axios from "axios";
import { useState, useEffect } from "react";

interface Feed {
  feedId: number;
  userId: number;
  clubId: number;
  emailId: string;
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
}

export default function MyAllFeeds() {
  const [clubs, setClubs] = useState([]);
  const [userId, setUserId] = useState<string>("0");
  const [feeds, setFeeds] = useState<Feed[]>([]);

  // 로컬 스토리지에서 userId 읽어오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      console.log(`로컬 스토리지에서 읽어온 userId: ${storedUserId}`);
      setUserId(storedUserId || "0");
    }
  }, []);

  // userId 상태가 변경될 때마다 피드 데이터 불러오기
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const url = `https://back.muscle-maker.site/feeds/${userId}`;
        const response = await axios.get(url);
        setFeeds(response.data.data.feeds); // API 응답 구조에 따라 접근
        console.log(response.data.message); // 성공 메시지 로그
      } catch (error) {
        console.error("피드 데이터 조회 중 오류 발생:", error);
      }
    };

    if (userId !== "0") {
      fetchFeeds();
    }
  }, [userId]); // userId를 의존성 배열에 추가

  if (feeds.length === 0) {
    return <h1 style={{ textAlign: "center" }}>피드를 올려 주세요.</h1>;
  }
  // 내가 속한 클럽 데이터 꺼내기

  return(
    <div style = {{display : 'grid', gridTemplateColumns : 'repeat(3,3fr)', gridGap : '5px'}}>
      {feeds.map((post) => <Mypost key={post.feedId} post={post} />)}
    </div>
  );
}
