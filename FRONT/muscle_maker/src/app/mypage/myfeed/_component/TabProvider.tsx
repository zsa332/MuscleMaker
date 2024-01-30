"use client";

import { createContext, useState, ReactNode } from "react";

export const TabContext = createContext({
  tab: "diet",
  setTab: (value: "diet" | "exercise" | "all") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("diet");
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
