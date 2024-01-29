"use client";

import { createContext, useState, ReactNode } from "react";

export const TabContext = createContext({
  tab: "home",
  setTab: (value: "home" | "mem" | "feed") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("home");
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
