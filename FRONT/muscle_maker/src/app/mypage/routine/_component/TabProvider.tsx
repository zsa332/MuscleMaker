"use client"

import { useState, createContext, ReactNode } from "react"
import style from './tab.module.css'

export const TabContext = createContext({
  tab: "week",
  setTab: (value: "week" | "month" | "set" | "cart") => {},
});

type Props = { children: ReactNode };

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState('week');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  )
}