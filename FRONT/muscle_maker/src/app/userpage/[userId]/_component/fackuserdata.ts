// followersdata.ts 수정

import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  userId: number;
  nickname: string;
  image: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data?: {
    followers: User[];
    followings: User[];
  };
}

// 더미 데이터 정의 (userId 참조 제거)
const dummyData = (userId: number): ApiResponse => ({
  status: 200,
  message: `조회 성공 - 유저 ID: ${userId}`, // 동적으로 userId를 메시지에 포함
  data: {
    followers: [
      {
        userId: 1,
        nickname: "_soyonii",
        image: "/chaewon.jpg"
      },
      {
        userId: 3,
        nickname: "영서링",
        image: "https://example.com/영서링.jpg"
      },
      {
        userId: 4,
        nickname: "sss",
        image: "https://example.com/sss.jpg"
      },
      {
        userId: 1,
        nickname: "_soyonii",
        image: "https://example.com/_soyonii.jpg"
      },
      {
        userId: 3,
        nickname: "영서링",
        image: "https://example.com/영서링.jpg"
      },
      {
        userId: 4,
        nickname: "sss",
        image: "https://example.com/sss.jpg"
      },
      {
        userId: 1,
        nickname: "_soyonii",
        image: "https://example.com/_soyonii.jpg"
      },
      {
        userId: 3,
        nickname: "영서링",
        image: "https://example.com/영서링.jpg"
      },
      {
        userId: 4,
        nickname: "sss",
        image: "https://example.com/sss.jpg"
      },
    ],
    followings: [
      {
        userId: 1,
        nickname: "_soyonii",
        image: "https://example.com/_soyonii.jpg"
      },
      {
        userId: 3,
        nickname: "영서링",
        image: "https://example.com/영서링.jpg"
      },
      {
        userId: 4,
        nickname: "sss",
        image: "https://example.com/sss.jpg"
      }
    ]
  }
});

export const fetchFollowData = async (userId: number): Promise<ApiResponse> => {
  // 모든 userId에 대해 성공적인 응답을 반환하도록 수정
  return dummyData(userId); // userId를 인자로 전달하여 더미 데이터 생성
};
