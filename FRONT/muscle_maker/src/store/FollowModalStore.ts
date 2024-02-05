// stores/FollowModalStore.ts
import create from 'zustand';

// 상태와 액션들에 대한 인터페이스 정의
interface FollowModalState {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Store 생성
const useFollowModalStore = create<FollowModalState>((set) => ({
  showModal: false,
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
}));

export default useFollowModalStore;
