'use client'

import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";


interface successDays{
  successDays: number;
}

export default function SuccessDays({successDays}:successDays) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_:any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
const graphData = [
  { name: successDays + "Day", value: successDays },
  { name: successDays + "Day fail", value: 100 - successDays },
];


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};


  return (
    <PieChart width={170} height={170}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={graphData} // 여기를 수정
        cx={85}
        cy={85}
        innerRadius={50}
        outerRadius={70}
        fill="#884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
