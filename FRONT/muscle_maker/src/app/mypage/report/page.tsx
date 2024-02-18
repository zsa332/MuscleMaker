import ReportTab from "@/app/mypage/report/_component/ReportTab";
import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import style from "./report.module.css";
import Analyse from "@/app/mypage/report/_component/Analyse";
import WeightChart from "./_component/WeightChart";
import MuscleChart from "./_component/MuscleChart";
import FatChart from "./_component/FatChart";
import { WeightDisplay } from "@/app/mypage/report/_component/Analyse";
import { FatDisplay } from "@/app/mypage/report/_component/Analyse";
import { MuscleDisplay } from "@/app/mypage/report/_component/Analyse";
import TargetSetup from "./_component/TargetSetup";

export default function Report() {
  return (
    <div>
      <TopProfile />
      <ReportTab />
      <div className={style.main}>
        <TargetSetup></TargetSetup>
        <Analyse />
        <br />
        <br />
        <div className={style.chartCover}>
          <div style={{ textAlign: "center" }}>
            <h3>2024년</h3>
            <WeightDisplay />
          </div>
          <div className={style.weightChart}>
            <WeightChart />
          </div>
        </div>
        <br />
        <br />
        <div className={style.chartCover}>
          <div style={{ textAlign: "center" }}>
            <h3>2024년</h3>
            <MuscleDisplay />
          </div>
          <div className={style.weightChart}>
            <MuscleChart />
          </div>
        </div>
        <br />
        <br />
        <div className={style.chartCover}>
          <div style={{ textAlign: "center" }}>
            <h3>2024년</h3>
            <FatDisplay />
          </div>
          <div className={style.weightChart}>
            <FatChart />
          </div>
        </div>
      </div>
    </div>
  );
}
