"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type TabValue = "club" | "user" | "tag"; // '클럽', '사용자', '테그'에 해당하는 탭 값

export const TabContext = createContext({
  tab: "club" as TabValue, // 기본 탭을 '클럽'으로 설정
  setTab: (value: TabValue) => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("club" as TabValue); // 기본 탭을 '클럽'으로 설정
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
export function useTab() {
  return useContext(TabContext);
}