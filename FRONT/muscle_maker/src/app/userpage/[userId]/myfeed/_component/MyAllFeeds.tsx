"use client";
import Mypost from "@/app/(afterLogin)/_component/Mypost";
import axios from "axios";
import { useState, useEffect } from "react";

interface Feed {
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
}

type Props = {
  paramsUserId: string;
};

export default function MyAllFeeds({ paramsUserId }: Props) {
  const [clubs, setClubs] = useState([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    // 사용자가 속한 클럽 데이터를 불러오는 함수
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `https://back.muscle-maker.site/users/clubs?userId=${paramsUserId}`
        );
        // 응답에서 클럽 데이터를 상태에 저장
        setClubs(response.data.data); // API 응답 구조에 따라 접근
        console.log(response.data.message); // 성공 메시지 로그
      } catch (error) {
        console.error("클럽 데이터 조회 중 오류 발생:", error);
      }
    };

    // 피드 데이터를 불러오는 함수
    const fetchFeeds = async () => {
      try {
        // 피드 데이터 요청 URL
        const url = `https://back.muscle-maker.site/feeds/${paramsUserId}`;
        const response = await axios.get(url);

        // 응답에서 피드 데이터를 상태에 저장
        setFeeds(response.data.data.feeds); // API 응답 구조에 따라 접근
        console.log(response.data.message); // 성공 메시지 로그
      } catch (error) {
        console.error("피드 데이터 조회 중 오류 발생:", error);
      }
    };

    // 함수 실행
    fetchFeeds();
  }, []);

  // 내가 속한 클럽 데이터 꺼내기

  return(
    <div style = {{display : 'grid', gridTemplateColumns : 'repeat(3,3fr)', gridGap : '5px'}}>
      {feeds.map((post) => <Mypost key={post.feedId} post={post} />)}
    </div>
  );}
