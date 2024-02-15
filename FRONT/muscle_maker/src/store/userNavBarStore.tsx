import { create } from "zustand";

interface navBar {
  navBar: string;
  setNavBar: (navBar: string) => void;
}

const usernavBarStore = create<navBar>((set) => ({
  navBar: "userfeed",
  setNavBar: (navBar) => {
    set((state) => ({ navBar: navBar }));
  },
}));

export default usernavBarStore;
