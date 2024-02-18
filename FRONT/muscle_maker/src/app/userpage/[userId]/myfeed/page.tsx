import TabProvider from "@/app/userpage/[userId]/myfeed/_component/TabProvider";
import TabDecider from "@/app/userpage/[userId]/myfeed/_component/TabDecider";
import Tab from "@/app/userpage/[userId]/myfeed/_component/Tab";
import TopProfile from "@/app/userpage/[userId]/_component/TopProfile";

type Props = {
  params: { userId: string };
};

export default async function MyFeed({ params }: Props) {
  return (
    <div>
      <TopProfile paramsUserId={params.userId} />
      <TabProvider>
        <Tab />
        <TabDecider paramsUserId={params.userId} />
      </TabProvider>
    </div>
  );
}
