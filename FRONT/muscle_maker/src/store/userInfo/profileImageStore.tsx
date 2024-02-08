import { create } from "zustand";

interface ProfileImageState {
  imgFile: File | null;
  setImgFile: (image: File | null) => void;
}

const useProfileImageStore = create<ProfileImageState>((set) => ({
  imgFile: null,
  setImgFile: (image: File | null) => set({ imgFile: image }),
}));

export default useProfileImageStore;
