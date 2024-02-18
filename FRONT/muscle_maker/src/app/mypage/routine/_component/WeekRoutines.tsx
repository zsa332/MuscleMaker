import React, { useEffect, useState } from 'react';
import { routines as routineAPI } from '@/app/apis/api/routine';
import style from '../_component/week.module.css'

interface Exercise {
  exerciseId: number;
  name: string;
  setTime: number;
  number: number;
  weight: number;
  success: boolean;
}

interface Routine {
  routineId: number;
  whichDay: number;
  date: string;
  exerciseResponseList: Exercise[];
}


export default function WeekRoutines() {
  const [routines, setRoutines] = useState<Routine[]>([]); // 루틴 상태를 추가
  console.log(routines,": 루틴확인")

  const fetchWeekRoutines = async () => {
    const storedUserId = localStorage.getItem("userId") || '';
    const targetUserId = parseInt(storedUserId);
    try {
      const response = await routineAPI.findThisWeekRoutine(targetUserId);
      setRoutines(response.data.data);
    } catch (error) {
      console.error("이번 주 루틴 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchWeekRoutines()
  },[]);

  return (
    <div>
      <button onClick={() => fetchWeekRoutines()}>이번 주 루틴 조회</button>
      {routines.length > 0 ? (
        <ul>
          {routines.map((routine) => (
            <li key={routine.routineId}>
              <p>날짜: {routine.date}</p>
              {routine.exerciseResponseList && routine.exerciseResponseList.length > 0 ? (
                <ul>
                  {routine.exerciseResponseList.map((exercise:Exercise) => (
                    <li key={exercise.exerciseId}>
                      <p>운동 이름: {exercise.name || "이름 없음"}</p>
                      <p>세트 수: {exercise.setTime || 0}</p>
                      <p>횟수: {exercise.number || 0}</p>
                      <p>무게: {exercise.weight || 0}kg</p>
                      <p>성공 여부: {exercise.success ? '성공' : '실패'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p></p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}

