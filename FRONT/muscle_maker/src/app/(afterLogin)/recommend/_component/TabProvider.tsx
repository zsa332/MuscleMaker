"use client";

import { createContext, useState, ReactNode } from "react";

export const TabContext = createContext({
  tab: "group",
  setTab: (value: "group" | "user") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("group");
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      { children }
    </TabContext.Provider>
  );
}
