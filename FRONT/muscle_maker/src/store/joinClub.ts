// RecommendGroups.tsx에 임포트
import { create } from "zustand";
import axios from "axios";

interface Club {
  clubId: number;
  title : string;
  goal: string;
  category: boolean; // '헬스' 또는 '식단'과 같은 문자열을 받을 수 있도록 변경
  memberCnt: number;
  level: number;
  image: string; // 클럽 이미지 URL
  exp : number;
  successDays : number;
}

interface ClubStore {
  myclubs: Club[];
  recommendationClubs: Club[];
  setClubs: (clubs: Club[]) => void;
  setRecommendationClubs: (clubs: Club[]) => void;
  handleJoinClub: (clubId: number, userId: number) => void; // 사용자 ID를 동적으로 처리
}

export const joinClubStore = create<ClubStore>((set) => ({
  myclubs: [],
  recommendationClubs: [],
  setClubs: (clubs) => set(() => ({myclubs : clubs})),
  setRecommendationClubs: (recommendationClubs) => set({ recommendationClubs }),
  handleJoinClub: (clubId, userId) => {
    // userId 파라미터 추가
    const joinRequest = {
      userId, // 동적으로 받은 사용자 ID 사용
      clubId,
    };

    axios
      .post("/users/clubs/join", joinRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("가입 신청 성공:", response.data);
          // 성공 시 추가적인 처리나 상태 업데이트를 여기서 수행
        } else {
          console.error("서버 오류:", response.status);
        }
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
  },
}));
