"use client";

import style from "./analyse.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/(afterLogin)/_component/LoadingComponent";
import Link from "next/link";

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

export default function Analyse() {
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

  if (personalPurpose.length === 0) {
    // alert("목표설정이 비어있습니다.");
    return <Link href="">목표가 비어있습니다. 목표설정을 해주세요.</Link>;
  }

  if (inbody.length === 0) {
    // alert("인바디 설정이 비어있습니다.");
    return (
      <Link href="">인바디 설정이 비어있습니다. 인바디 설정을 해주세요.</Link>
    );
  }

  const purposeWeight =
    Math.round(
      (personalPurpose[personalPurpose.length - 1].kg -
        inbody[inbody.length - 1].weight) *
        10
    ) / 10;
  const purposeMuscle =
    Math.round(
      (personalPurpose[personalPurpose.length - 1].muscle -
        inbody[inbody.length - 1].muscleMass) *
        10
    ) / 10;
  const purposeFat =
    Math.round(
      (personalPurpose[personalPurpose.length - 1].fat -
        inbody[inbody.length - 1].fatMass) *
        10
    ) / 10;
  // 만약 목표가 감량일경우
  if (personalPurpose[personalPurpose.length - 1].diet) {
    return (
      <div className={style.main}>
        <br />
        <h1>인바디 분석표</h1>
        <br />
        <br />
        <table className={style.table}>
          <tbody>
            <tr>
              <td>체중</td>
              <td>{inbody[inbody.length - 1].weight}kg</td>
              <td hidden={purposeWeight > 0}>
                목표 체중까지 {purposeWeight}kg 남았습니다.
              </td>
              <td hidden={purposeWeight <= 0}>
                목표 체중을 {purposeWeight}kg 초과했습니다.
              </td>
              <td hidden={purposeWeight <= 0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="rgb(220, 20, 10, 0.7)"
                >
                  <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                </svg>
              </td>
            </tr>
            <tr>
              <td>골격근량</td>
              <td>{inbody[inbody.length - 1].muscleMass}kg</td>
              <td hidden={purposeMuscle < 0}>
                목표 골격근량까지 {purposeMuscle}kg 남았습니다.
              </td>
              <td hidden={purposeMuscle >= 0}>
                목표 골격근량을 {purposeMuscle}kg 초과했습니다.
              </td>
              <td hidden={purposeMuscle >= 0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="rgb(220, 20, 10, 0.7)"
                >
                  <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                </svg>
              </td>
            </tr>
            <tr>
              <td>체지방</td>
              <td>{inbody[inbody.length - 1].fatMass}kg</td>
              <td hidden={purposeFat > 0}>
                목표 체지방까지 {purposeFat}kg 남았습니다.
              </td>
              <td hidden={purposeFat <= 0}>
                목표 체지방을 {purposeFat}kg 초과했습니다.
              </td>
              <td hidden={purposeFat <= 0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="rgb(220, 20, 10, 0.7)"
                >
                  <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  // 만약 목표가 증량일 경우
  return (
    <div className={style.main}>
      <br />
      <h1>인바디 분석표</h1>
      <br />
      <br />
      <table className={style.table}>
        <tbody>
          <tr>
            <td>체중</td>
            <td>{inbody[inbody.length - 1].weight}kg</td>
            <td hidden={purposeWeight > 0}>
              목표 체중까지 {-purposeWeight}kg 남았습니다.
            </td>
            <td hidden={purposeWeight < 0}>
              목표 체중을 {-purposeWeight}kg 초과했습니다.
            </td>
            <td hidden={purposeWeight < 0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="rgb(220, 20, 10, 0.7)"
              >
                <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
              </svg>
            </td>
          </tr>
          <tr>
            <td>골격근량</td>
            <td>{inbody[inbody.length - 1].muscleMass}kg</td>
            <td hidden={purposeMuscle < 0}>
              목표 골격근량까지 {purposeMuscle}kg 남았습니다.
            </td>
            <td hidden={purposeMuscle >= 0}>
              목표 골격근량을 {purposeMuscle}kg 초과했습니다.
            </td>
            <td hidden={purposeMuscle >= 0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="rgb(220, 20, 10, 0.7)"
              >
                <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
              </svg>
            </td>
          </tr>
          <tr>
            <td>체지방</td>
            <td>{inbody[inbody.length - 1].fatMass}kg</td>
            <td hidden={purposeFat > 0}>
              목표 체지방까지 {purposeFat}kg 남았습니다.
            </td>
            <td hidden={purposeFat <= 0}>
              목표 체지방을 {purposeFat}kg 초과했습니다.
            </td>
            <td hidden={purposeFat <= 0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="rgb(220, 20, 10, 0.7)"
              >
                <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function WeightDisplay() {
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
        const goalResponse = await axios.get(
          `https://back.muscle-maker.site/individual-goal?userId=${userId}`
        );
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
  if (personalPurpose.length === 0) {
    // alert("목표설정이 비어있습니다.");
    return <h2>목표체중이 비어있습니다. 목표설정을 해주세요.</h2>;
  }

  return <h2>목표체중 {personalPurpose[personalPurpose.length - 1].kg}kg</h2>;
}

export function FatDisplay() {
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
        const goalResponse = await axios.get(
          `https://back.muscle-maker.site/individual-goal?userId=${userId}`
        );
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

  if (personalPurpose.length === 0) {
    // alert("목표설정이 비어있습니다.");
    return <h2>목표체지방이 비어있습니다. 목표설정을 해주세요.</h2>;
  }
  return (
    <h2>목표체지방 {personalPurpose[personalPurpose.length - 1].fat}kg</h2>
  );
}

export function MuscleDisplay() {
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
        const goalResponse = await axios.get(
          `https://back.muscle-maker.site/individual-goal?userId=${userId}`
        );
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
  if (personalPurpose.length === 0) {
    // alert("목표설정이 비어있습니다.");
    return <h2>목표골격근량이 비어있습니다. 목표설정을 해주세요.</h2>;
  }
  return (
    <h2>목표골격근량 {personalPurpose[personalPurpose.length - 1].muscle}kg</h2>
  );
}
