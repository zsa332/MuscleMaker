import ReportTab from "@/app/mypage/report/_component/ReportTab";
import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import style from "./report.module.css";
import Analyse from "@/app/mypage/report/_component/Analyse";

export default function Report() {
  return (
    <div>
      <TopProfile />
      <ReportTab />
      <div className={style.main}>
        <Analyse />
      </div>
    </div>
  );
}
