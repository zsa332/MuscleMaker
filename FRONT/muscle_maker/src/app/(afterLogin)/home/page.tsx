import style from "./home.module.css";
import { Metadata } from "next";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import TabDecider from "./_component/TabDecider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "홈 / MM",
  description: "홈",
};

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <br />
        <br />
        <br />
        <TabDecider />
      </TabProvider>
    </main>
  );
}
