import { create } from "zustand";

interface homeStoreState {
  canChange: boolean; // 알림 목록 변경 가능 여부
  detailFeedId: number; // 상세 피드 ID
  setCanChange: (flag: boolean, newFeedId: number) => void; // 변경 가능 여부 설정 함수
}

export const homeStore = create<homeStoreState>((set) => ({
  canChange: false, // 기본적으로 알림 목록 변경 불가능
  detailFeedId: 0, // 초기 상세 피드 ID는 숫자0

  // 변경 가능 여부 설정 함수 정의
  setCanChange: (flag: boolean, newFeedId: number) => {
    // 변경된 값에 따라 detailFeedId 설정
    if (flag) {
      set({ canChange: flag, detailFeedId: newFeedId });
    } else {
      set({ canChange: flag });
    }
  },
}));
