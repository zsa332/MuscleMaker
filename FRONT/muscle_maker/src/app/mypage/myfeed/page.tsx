import TabProvider from "@/app/mypage/myfeed/_component/TabProvider";
import TabDecider from "@/app/mypage/myfeed/_component/TabDecider";
import Tab from "@/app/mypage/myfeed/_component/Tab";
import TopProfile from "@/app/(afterLogin)/_component/TopProfile";

export default async function MyFeed() {
  return (
    <div>
      <TopProfile />
      <TabProvider>
        <Tab />
        <TabDecider />
      </TabProvider>
    </div>
  );
}
