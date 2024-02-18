import style from "./search.module.css";
import { Metadata } from "next";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import TabDecider from "./_component/TabDecider";
import { ReactNode, Suspense } from "react";
import { useRouter } from "next/router";

export const metadata: Metadata = {
  title: "홈 / MM",
  description: "홈",
};

export default function Home() {
  // const router = useRouter();
  // const searchQuery = router.query.keyword as string;
  return (
    <main className={style.main}>
      <Suspense fallback={<div>Loading...</div>}>
        <TabProvider>
          <Tab />
          <br />
          <br />
          <br />
          <TabDecider />
        </TabProvider>
      </Suspense>
    </main>
  );
}
