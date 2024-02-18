import { create } from "zustand";

// User 인터페이스 정의
interface User {
  userId: number;
  nickname: string;
  imgUrl: string;
}

// FollowerListState 인터페이스 확장
interface FollowerListState {
  followers: User[];
  followings: User[]; // followings 상태 추가
  setFollowers: (users: User[]) => void;
  setFollowings: (users: User[]) => void; // followings를 설정하는 함수 추가
}

// useFollowerListStore 스토어 정의
export const useFollowerListStore = create<FollowerListState>((set) => ({
  followers: [],
  followings: [], // 초기 followings 상태 설정
  setFollowers: (users) => set(() => ({ followers: users })),
  setFollowings: (users) => set(() => ({ followings: users })), // followings 상태를 업데이트하는 함수
}));
