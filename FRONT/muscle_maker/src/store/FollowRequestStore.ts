// store/followStore.ts
import { create } from "zustand";
import { follows } from "@/app/apis/api/followapi";

interface FollowState {
  followMessage: string;
  isLoading: boolean;
  errorMessage: string;
  applyFollow: (followRequest: {
    followerId: number;
    followingId: number;
  }) => Promise<void>;
}

export const useFollowRequsetStore = create<FollowState>((set) => ({
  followMessage: "",
  isLoading: false,
  errorMessage: "",
  applyFollow: async (followRequest) => {
    set({ isLoading: true, errorMessage: "", followMessage: "" });
    try {
      const response = await follows.applyFollow(followRequest);
      set({ followMessage: response.data.message, isLoading: false });
    } catch (error: any) {
      set({ errorMessage: error.response.data.message, isLoading: false });
    }
  },
}));
