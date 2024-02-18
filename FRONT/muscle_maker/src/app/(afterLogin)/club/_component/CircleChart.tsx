import style from "@/app/(afterLogin)/club/_component/circlechart.module.css"
import CompletionPercent from "./_chart/CompletionPercentCircleGraph"
import Exp from "@/app/(afterLogin)/club/_component/_chart/ExpCircleGraph"
import SuccessDays from "@/app/(afterLogin)/club/_component/_chart/SuccessDaysCircleGraph"
interface ChartProps {
  completionPercent : number;
  exp : number;
  successDays : number;
}
export default function CircleChart({completionPercent, exp, successDays}: ChartProps) {
  return(
    <div className={style.box}>
      <div className={style.innerbox}>
        <h3 className={style.headtext}>평균 성공률</h3>
        <CompletionPercent completionPercent={completionPercent}/>
      </div>
      <div className={style.innerbox}>
        <h3 className={style.headtext}> 경험치</h3>
        <Exp exp={exp}/>
      </div>
      <div className={style.innerbox}>
        <h3 className={style.headtext}>성공일수</h3>
        <SuccessDays successDays={successDays}/>
      </div>
    </div>
  )
}
