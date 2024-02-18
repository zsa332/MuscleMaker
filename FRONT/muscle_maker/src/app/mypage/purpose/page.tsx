"use client";

import TopProfile from "@/app/(afterLogin)/_component/TopProfile";
import style from "./purpose.module.css";
import Image from "next/image";
import Weight from "@/asset/weight.png";
import Muscle from "@/asset/muscle.png";
import Fat from "@/asset/fat.png";
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

export default function Purpose() {
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
        const individualGoalId =
          personalPurpose[personalPurpose.length - 1].individualGoalId;
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        console.log(individualGoalResponse);
        alert("체중목표가 성공적으로 업데이트되었습니다.");
      } else {
        await individualGoal.writeIndividualGoal(
          userId,
          individualGoalResponse
        );
        alert("새로운 체중목표가 성공적으로 설정되었습니다.");
      }

      if (inbodyInfo.length > 0) {
        const inBodyId = inbodyInfo[inbodyInfo.length - 1].inBodyId;
        await inbody.addInbody(inBodyId, inbodyInfoResponse);
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
        const individualGoalId =
          personalPurpose[personalPurpose.length - 1].individualGoalId;
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
        const inBodyId = inbodyInfo[inbodyInfo.length - 1].inBodyId;
        await inbody.addInbody(inBodyId, inbodyInfoResponse);
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
      muscle: personalPurpose[personalPurpose.length - 1]?.fat || 0,
      fat: newDietGoal,
    };

    const inbodyInfoResponse = {
      weight: inbodyInfo[inbodyInfo.length - 1]?.weight || 0,
      muscleMass: inbodyInfo[inbodyInfo.length - 1]?.muscleMass || 0,
      fatMass: newDietInbody,
    };

    try {
      if (personalPurpose.length > 0) {
        const individualGoalId =
          personalPurpose[personalPurpose.length - 1].individualGoalId;
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
        const inBodyId = inbodyInfo[inbodyInfo.length - 1].inBodyId;
        await inbody.addInbody(inBodyId, inbodyInfoResponse);
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
    <div>
      <TopProfile />
      <br />
      <div className={style.main}>
        <div className={style.head}>
          <h2>수정하고 싶은 수치를 눌러주세요!</h2>
        </div>
        <div className={style.content}>
          {/* 체중 섹션 */}
          <div className={style.innerStyle} onClick={handleWeightSectionClick}>
            <div>
              <br />
              <Image src={Weight} alt="weight_img" />
            </div>
            <div className={style.innerText}>
              <div>
                종류 : <span>체중</span>
              </div>
              {editWeightMode ? (
                <>
                  <div onClick={handleWeightInputClick}>
                    현재 :{" "}
                    <input
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
                    목표 :{" "}
                    <input
                      type="number"
                      defaultValue={
                        personalPurpose.length > 0
                          ? personalPurpose[personalPurpose.length - 1].kg
                          : 0
                      }
                      onChange={handleWeightGoalChange}
                    />
                  </div>
                  <div className={style.foot} onClick={handleWeightInputClick}>
                    <button onClick={handleWeightEditComplete}>
                      수정 완료
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    현재 :{" "}
                    <span>
                      {inbodyInfo.length > 0
                        ? inbodyInfo[inbodyInfo.length - 1].weight
                        : "설정값 없음"}
                    </span>
                  </div>
                  <div>
                    목표 :{" "}
                    <span>
                      {personalPurpose.length > 0
                        ? personalPurpose[personalPurpose.length - 1].kg
                        : "설정값 없음"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 골격근량 섹션 */}
          <div className={style.innerStyle} onClick={handleMuscleSectionClick}>
            <div>
              <br />
              <Image src={Muscle} alt="muscle_img" />
            </div>
            <div className={style.innerText}>
              <div>
                종류 : <span>골격근량</span>
              </div>
              {editMuscleMode ? (
                <>
                  <div onClick={handleMuscleInputClick}>
                    현재 :{" "}
                    <input
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
                    목표 :{" "}
                    <input
                      type="number"
                      defaultValue={
                        personalPurpose.length > 0
                          ? personalPurpose[personalPurpose.length - 1].muscle
                          : 0
                      }
                      onChange={handleMuscleGoalChange}
                    />
                  </div>
                  <div className={style.foot} onClick={handleMuscleInputClick}>
                    <button onClick={handleMuscleEditComplete}>
                      수정 완료
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    현재 :{" "}
                    <span>
                      {inbodyInfo.length > 0
                        ? inbodyInfo[inbodyInfo.length - 1].muscleMass
                        : "설정값 없음"}
                    </span>
                  </div>
                  <div>
                    목표 :{" "}
                    <span>
                      {personalPurpose.length > 0
                        ? personalPurpose[personalPurpose.length - 1].muscle
                        : "설정값 없음"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 체지방 섹션 */}
          <div className={style.innerStyle} onClick={handleDietSectionClick}>
            <div>
              <br />
              <Image src={Fat} alt="fat_img" />
            </div>
            <div className={style.innerText}>
              <div>
                종류 : <span>체중</span>
              </div>
              {editDietMode ? (
                <>
                  <div onClick={handleDietInputClick}>
                    현재 :{" "}
                    <input
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
                    목표 :{" "}
                    <input
                      type="number"
                      defaultValue={
                        personalPurpose.length > 0
                          ? personalPurpose[personalPurpose.length - 1].fat
                          : 0
                      }
                      onChange={handleDietGoalChange}
                    />
                  </div>
                  <div className={style.foot} onClick={handleDietInputClick}>
                    <button onClick={handleDietEditComplete}>수정 완료</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    현재 :{" "}
                    <span>
                      {inbodyInfo.length > 0
                        ? inbodyInfo[inbodyInfo.length - 1].fatMass
                        : "설정값 없음"}
                    </span>
                  </div>
                  <div>
                    목표 :{" "}
                    <span>
                      {personalPurpose.length > 0
                        ? personalPurpose[personalPurpose.length - 1].fat
                        : "설정값 없음"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
