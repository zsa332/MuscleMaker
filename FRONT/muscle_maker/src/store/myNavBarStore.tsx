import { create } from "zustand";

interface navBar {
  navBar: string;
  setNavBar: (navBar: string) => void;
}

const mynavBarStore = create<navBar>((set) => ({
  navBar: "myfeed",
  setNavBar: (navBar) => {
    set((state) => ({ navBar: navBar }));
  },
}));

export default mynavBarStore;
