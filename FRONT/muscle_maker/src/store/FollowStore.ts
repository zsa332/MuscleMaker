// FollowStore.ts
import create from 'zustand';

type FollowStore = {
  isFollowModalOpen: boolean;
  openFollowModal: () => void;
  closeFollowModal: () => void;
};

export const useFollowStore = create<FollowStore>((set) => ({
  isFollowModalOpen: false,
  openFollowModal: () => set({ isFollowModalOpen: true }),
  closeFollowModal: () => set({ isFollowModalOpen: false }),
}));
