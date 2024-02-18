// types.ts - 데이터 타입을 정의하는 파일
export interface Club {
  club_id: number;
  category: boolean;
  member_count: number;
  goal: string;
  level: number;
}

export interface ClubsResponse {
  status: number;
  message: string;
  data: {
    clubs: Club[];
  };
}

// dummyApi.ts - 더미 데이터를 반환하는 API 함수

export function getClubs(): Promise<ClubsResponse> {
  // 이 함수는 실제 API 호출을 모방합니다.
  return Promise.resolve({
    status: 200,
    message: "사용자에게 추천하는 클럽 정보 조회 성공",
    data: {
      clubs: [
        {
          club_id: 1,
          category: false,
          member_count: 8,
          goal: "김계란이 되자 클럽",
          level: 12,
        },
        {
          club_id: 2,
          category: true,
          member_count: 10,
          goal: "아침은 굶자 클럽",
          level: 14,
        },
        {
          club_id: 3,
          category: true,
          member_count: 10,
          goal: "저녁 굶자 클럽",
          level: 14,
        },
      ],
    },
  });
}
