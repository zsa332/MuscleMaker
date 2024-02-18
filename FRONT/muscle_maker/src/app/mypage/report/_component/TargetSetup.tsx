"use client";

import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import style from "./targetSetup.module.css";
import Image from "next/image";
import Weight from "@/asset/weight.png";
import Muscle from "@/asset/muscle.png";
import Fat from "@/asset/fat.png";
import PlusButton from "@/app/(afterLogin)/_component/PlusButton";
import { useEffect, useState } from "react";
import { individualGoal } from "@/app/apis/api/individualgoal";
import { inbody } from "@/app/apis/api/inbodyapi";
import Loading from "@/app/(afterLogin)/_component/LoadingComponent";

interface InbodyData {
  inBodyId: number;
  weight: number;
  muscleMass: number;
  fatMass: number;
  createdAt: string;
  modifiedAt: string;
}

interface PersonalPurposeData {
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

export default function TargetSetup() {
  const [inbodyInfo, setInbodyInfo] = useState<InbodyData[]>([]);
  const [personalPurpose, setPersonalPurpose] = useState<PersonalPurposeData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [editWeightMode, setEditWeightMode] = useState(false);
  const [editMuscleMode, setEditMuscleMode] = useState(false);
  const [editDietMode, setEditDietMode] = useState(false);
  const [newWeightGoal, setNewWeightGoal] = useState<number>(
    personalPurpose[personalPurpose.length - 1]?.kg || 0
  );
  const [newMuscleGoal, setNewMuscleGoal] = useState<number>(
    personalPurpose[personalPurpose.length - 1]?.muscle || 0
  );
  const [newDietGoal, setNewDietGoal] = useState<number>(
    personalPurpose[personalPurpose.length - 1]?.fat || 0
  );
  const [newWeightInbody, setNewWeightInbody] = useState<number>(
    inbodyInfo[inbodyInfo.length - 1]?.weight || 0
  );
  const [newMuscleInbody, setNewMuscleInbody] = useState<number>(
    inbodyInfo[inbodyInfo.length - 1]?.muscleMass || 0
  );
  const [newDietInbody, setNewDietInbody] = useState<number>(
    inbodyInfo[inbodyInfo.length - 1]?.fatMass || 0
  );
  const fetchData = async () => {
    try {
      const storedUserId = localStorage.getItem("userId") || "";
      const parsedUserId = parseInt(storedUserId || "");
      console.log("parsedUserId:", parsedUserId);
      const inBodyResponse = await inbody.getinbdoy(parsedUserId);
      const goalResponse = await individualGoal.getIndividualGaol(parsedUserId);
      setInbodyInfo(inBodyResponse.data.data);
      setPersonalPurpose(goalResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 체중 수정 완료 핸들러
  const handleWeightEditComplete = async (e: {
    stopPropagation: () => void;
  }) => {
    e.stopPropagation();
    const storedUserId = localStorage.getItem("userId") || "";
    const userId = parseInt(storedUserId);
    const individualGoalResponse = {
      kg: newWeightGoal,
      muscle: personalPurpose[personalPurpose.length - 1]?.muscle || 0,
      fat: personalPurpose[personalPurpose.length - 1]?.fat || 0,
    };

    const inbodyInfoResponse = {
      weight: Number(newWeightInbody),
      muscleMass: inbodyInfo[inbodyInfo.length - 1]?.muscleMass || 0,
      fatMass: inbodyInfo[inbodyInfo.length - 1]?.fatMass || 0,
    };

    try {
      if (personalPurpose.length > 0) {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("체중목표가 성공적으로 업데이트되었습니다.");
      } else {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("새로운 체중목표가 성공적으로 설정되었습니다.");
      }

      if (inbodyInfo.length > 0) {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("체중 인바디 정보가 성공적으로 업데이트되었습니다.");
      } else {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("새로운 체중 인바디 정보가 설정되었습니다.");
      }

      await fetchData();
    } catch (error) {
      console.error("체중 인바디 설정/업데이트 중 오류 발생:", error);
    }

    // 편집 모드 해제
    setEditWeightMode(false);
  };

  // 근력 수정 완료 핸들러
  const handleMuscleEditComplete = async (e: {
    stopPropagation: () => void;
  }) => {
    e.stopPropagation();
    const storedUserId = localStorage.getItem("userId") || "";
    const userId = parseInt(storedUserId);
    const individualGoalResponse = {
      kg: personalPurpose[personalPurpose.length - 1]?.kg || 0,
      muscle: newMuscleGoal,
      fat: personalPurpose[personalPurpose.length - 1]?.fat || 0,
    };

    const inbodyInfoResponse = {
      weight: inbodyInfo[inbodyInfo.length - 1]?.weight || 0,
      muscleMass: newMuscleInbody,
      fatMass: inbodyInfo[inbodyInfo.length - 1]?.fatMass || 0,
    };

    try {
      if (personalPurpose.length > 0) {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("근량목표가 성공적으로 업데이트되었습니다.");
      } else {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("새로운 근량목표가 성공적으로 설정되었습니다.");
      }

      if (inbodyInfo.length > 0) {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("근량 인바디 정보가 성공적으로 업데이트되었습니다.");
      } else {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("새로운 근량 인바디 정보가 설정되었습니다.");
      }

      await fetchData();
    } catch (error) {
      console.error("근량 인바디 설정/업데이트 중 오류 발생:", error);
    }

    // 편집 모드 해제
    setEditMuscleMode(false);
  };

  // 체지방 수정 완료 핸들러
  const handleDietEditComplete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const storedUserId = localStorage.getItem("userId") || "";
    const userId = parseInt(storedUserId);
    const individualGoalResponse = {
      kg: personalPurpose[personalPurpose.length - 1]?.kg || 0,
      muscle: personalPurpose[personalPurpose.length - 1]?.muscle || 0,
      fat: newDietGoal,
    };

    const inbodyInfoResponse = {
      weight: inbodyInfo[inbodyInfo.length - 1]?.weight || 0,
      muscleMass: inbodyInfo[inbodyInfo.length - 1]?.muscleMass || 0,
      fatMass: newDietInbody,
    };

    try {
      if (personalPurpose.length > 0) {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("체지방목표가 성공적으로 업데이트되었습니다.");
      } else {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("새로운 체지방목표가 성공적으로 설정되었습니다.");
      }

      if (inbodyInfo.length > 0) {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("체지방 인바디 정보가 성공적으로 업데이트되었습니다.");
      } else {
        await inbody.addInbody(userId, inbodyInfoResponse);
        alert("새로운 체지방 인바디 정보가 설정되었습니다.");
      }

      await fetchData();
    } catch (error) {
      console.error("체지방 인바디 설정/업데이트 중 오류 발생:", error);
    }

    // 편집 모드 해제
    setEditDietMode(false);
  };

  // 업데이트를 위한 핸들러
  const handleWeightGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeightGoal(Number(e.target.value));
  };

  const handleMuscleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMuscleGoal(Number(e.target.value));
  };

  const handleDietGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDietGoal(Number(e.target.value));
  };

  const handleWeightInbodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeightInbody(Number(e.target.value));
  };

  const handleMuscleInbodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMuscleInbody(Number(e.target.value));
  };

  const handleDietInbodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDietInbody(Number(e.target.value));
  };

  // 편집 모드가 비활성화되어 있을 때만 편집 모드를 활성화
  const handleWeightSectionClick = (e: any) => {
    if (!editWeightMode) {
      setEditWeightMode(true);
    }
  };

  const handleMuscleSectionClick = (e: any) => {
    if (!editMuscleMode) {
      setEditMuscleMode(true);
    }
  };

  const handleDietSectionClick = (e: any) => {
    if (!editDietMode) {
      setEditDietMode(true);
    }
  };

  // 입력 필드 클릭 이벤트가 상위 요소로 전파되는 것을 방지
  const handleWeightInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleMuscleInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const handleDietInputClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={style.content}>
      {/* 체중 섹션 */}
      <div className={style.innerStyle} onClick={handleWeightSectionClick}>
        {/* <div style={{marginTop:'10px'}}>
            <span>체중[kg]</span>
          </div> */}
        <div className={style.innerText}>
          <img
            src="/weight-scale.png"
            style={{
              width: "70px",
              height: "70px",
              marginLeft: "0px",
              marginTop: "12px",
            }}
          ></img>
          <div style={{ marginTop: "20px", marginLeft: "10px" }}>
            <div onClick={handleWeightInputClick}>
              현재{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  inbodyInfo.length > 0
                    ? inbodyInfo[inbodyInfo.length - 1].weight
                    : 0
                }
                onChange={handleWeightInbodyChange}
              />
            </div>
            <div onClick={handleWeightInputClick}>
              목표{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  personalPurpose.length > 0
                    ? personalPurpose[personalPurpose.length - 1].kg
                    : 0
                }
                onChange={handleWeightGoalChange}
              />
            </div>
          </div>
        </div>
        <div
          onClick={handleWeightInputClick}
          style={{ marginLeft: "5px", width: "65%", marginBottom: "20px" }}
        >
          <button className={style.button} onClick={handleWeightEditComplete}>
            체중 수정
          </button>
        </div>
      </div>

      {/* 골격근량 섹션 */}
      <div className={style.innerStyle} onClick={handleWeightSectionClick}>
        {/* <div style={{marginTop:'10px'}}>
            <span>체중[kg]</span>
          </div> */}
        <div className={style.innerText}>
          <img
            src="/muscles.png"
            style={{
              width: "55px",
              height: "55px",
              marginLeft: "0px",
              marginTop: "15px",
              opacity: "0.7",
            }}
          ></img>
          <div style={{ marginTop: "20px", marginLeft: "10px" }}>
            <div onClick={handleMuscleInputClick}>
              현재{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  inbodyInfo.length > 0
                    ? inbodyInfo[inbodyInfo.length - 1].muscleMass
                    : 0
                }
                onChange={handleMuscleInbodyChange}
              />
            </div>
            <div onClick={handleMuscleInputClick}>
              목표{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  personalPurpose.length > 0
                    ? personalPurpose[personalPurpose.length - 1].muscle
                    : 0
                }
                onChange={handleMuscleGoalChange}
              />
            </div>
          </div>
        </div>
        <div
          onClick={handleMuscleInputClick}
          style={{ marginLeft: "5px", width: "65%", marginBottom: "20px" }}
        >
          <button className={style.button} onClick={handleMuscleEditComplete}>
            골격근량 수정
          </button>
        </div>
      </div>

      {/* 체지방 섹션 */}
      <div className={style.innerStyle} onClick={handleWeightSectionClick}>
        {/* <div style={{marginTop:'10px'}}>
            <span>체중[kg]</span>
          </div> */}
        <div className={style.innerText}>
          <img
            src="/fat.png"
            style={{
              width: "55px",
              height: "55px",
              marginLeft: "0px",
              marginTop: "15px",
              opacity: "0.6",
            }}
          ></img>
          <div style={{ marginTop: "20px", marginLeft: "10px" }}>
            <div onClick={handleDietInputClick}>
              현재{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  inbodyInfo.length > 0
                    ? inbodyInfo[inbodyInfo.length - 1].fatMass
                    : 0
                }
                onChange={handleDietInbodyChange}
              />
            </div>
            <div onClick={handleDietInputClick}>
              목표{" "}
              <input
                className={style.input}
                type="number"
                defaultValue={
                  personalPurpose.length > 0
                    ? personalPurpose[personalPurpose.length - 1].fat
                    : 0
                }
                onChange={handleDietGoalChange}
              />
            </div>
          </div>
        </div>
        <div
          onClick={handleDietInputClick}
          style={{ marginLeft: "5px", width: "65%", marginBottom: "20px" }}
        >
          <button className={style.button} onClick={handleDietEditComplete}>
            체지방량 수정
          </button>
        </div>
      </div>
    </div>
  );
}
