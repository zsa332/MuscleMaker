import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import TabDecider from "./_component/TabDecider";
import style from "@/app/(afterLogin)/recommend/recommend.module.css";

export default function MyFeed() {
  return (
    <>
    <div className={style.pagebackgroundcolor}>
      <TabProvider>
        <Tab/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <TabDecider/>
      </TabProvider>
    </div>
    </>
  );
}
