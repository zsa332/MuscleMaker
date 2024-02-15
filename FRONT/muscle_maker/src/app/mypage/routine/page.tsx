import CircularLoading3D from "@/app/(afterLogin)/_component/LoadingComponent";
import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import TabProvider from "./_component/TabProvider";
import Tab from "./_component/Tab";
import TabDecider from "./_component/TabDecider";


export default function MyFeed() {
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
