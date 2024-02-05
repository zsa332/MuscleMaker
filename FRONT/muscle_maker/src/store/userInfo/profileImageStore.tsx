import {create} from 'zustand';

interface ProfileImageState {
    imgFile: File | null;
  setImgFile: (image: File | null) => void;
//   uploadProfileImage: () => void;
}

const useProfileImageStore = create<ProfileImageState>((set) => ({
    imgFile: null,
  setImgFile: (image) => set({ imgFile: image })
}));

export default useProfileImageStore;
