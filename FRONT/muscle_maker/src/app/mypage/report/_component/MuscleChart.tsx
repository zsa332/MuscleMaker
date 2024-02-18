"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/(afterLogin)/_component/LoadingComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    y: {
      min: 0, // y축의 최소값을 0으로 시작하도록 설정
      max: 50, // y축의 최대값을 100으로 설정
    },
  },
};

export const data: Data = {
  labels: [],
  datasets: [
    {
      label: "나의 골격근량",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "목표 골격근량",
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export interface Data {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface InbodyData {
  inBodyId: number;
  weight: number;
  muscleMass: number;
  fatMass: number;
  createdAt: string;
  modifiedAt: string;
}

interface PersonalPurposeData {
  // 여기에 personalPurpose 데이터의 타입을 정의합니다.
  individualGoalId: number;
  userId: number;
  kg: number;
  muscle: number;
  fat: number;
  createdAt: string;
  modifiedAt: string;
  flag: boolean;
  diet: boolean;
}

interface labelData {
  data: string;
}

export default function MuscleChart() {
  const [labels, setLabels] = useState<labelData[]>();
  const [inbody, setInbody] = useState<InbodyData[]>([]);
  const [personalPurpose, setPersonalPurpose] = useState<PersonalPurposeData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("0");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId2 = localStorage?.getItem("userId");
      if (storedUserId2) {
        setUserId(storedUserId2);
      }
    } else {
      alert("로그인이 필요합니다.");
      return;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inBodyResponse = await axios.get(
          `https://back.muscle-maker.site/inbody?userId=${userId}`
        );
        const goalResponse = await axios.get(
          `https://back.muscle-maker.site/individual-goal?userId=${userId}`
        );
        setInbody(inBodyResponse.data.data);
        setPersonalPurpose(goalResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (userId !== "0") {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // 나의 체중
  data.datasets[0].data = inbody.map((item) => item.muscleMass);
  // 목표 체중
  data.datasets[1].data = personalPurpose.map((item) => item.muscle);
  // 라벨 채우기
  data.labels = inbody.map((item) => item.createdAt.split("T")[0]);
  return <Line data={data} options={options} />;
}
