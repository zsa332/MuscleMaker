import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./weeklyCalender.module.css";
import { useParams } from "react-router-dom";
import { routines as RoutineAPI } from "@/app/apis/api/routine";
import { useExerciseStore } from "@/store/routines/useExerciseStore";
import { basket as basketAPI } from "@/app/apis/api/basket";
// import AddExerciseForm from "./AddExerciseForm";

interface ExerciseItem {
  exerciseId: number;
  name: string;
  number: number;
  setTime: number;
  success: boolean;
  weight: number;
}

type Props = {
  paramsuserId: string;
};

export default function WeeklyComponent({
  paramsuserId,
}: Props): React.ReactElement {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [fwhichDay, setFwhichDay] = useState(Number);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [exercises, setExercises] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [storedUserId, setStoredUserId] = useState<string>("0");
  const { routines, fetchWeekRoutines } = useExerciseStore();
  const startOfWeek = dayjs(selectedDate).startOf("week");
  const today = dayjs();
  const days = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.add(index, "day")
  );
  const ParamsUserId = paramsuserId;
  const parsedParamsUserId = parseInt(ParamsUserId);
  const parsedStoredUserId: number = parseInt(storedUserId, 10);

  const loadWeeklyData = async () => {
    try {
      fetchWeekRoutines(parsedParamsUserId);
      console.log(parsedParamsUserId, "파람스아이디");
    } catch (error) {
      console.error("사용자 정보 에러:", error);
      setError("사용자 정보 에러.");
    }
  };

  useEffect(() => {
    loadWeeklyData();
  }, [selectedDate]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUserId = localStorage?.getItem("userId");
      const today = dayjs().format("YYYY-MM-DD");
      if (localUserId) {
        setSelectedDate(today);
        setStoredUserId(localUserId);
      }
    } else if (storedUserId === "0") {
      setError("로그인이 필요합니다.");
      return;
    }
    loadWeeklyData();
  }, [storedUserId]);

  useEffect(() => {
    const dayRoutine = routines.find(
      (routine) => routine.date === selectedDate
    );
    console.log(dayRoutine);
    if (dayRoutine) {
      setExercises(dayRoutine.exerciseResponseList);
      setFwhichDay(dayRoutine.whichDay);
      console.log(dayRoutine.whichDay);
    } else {
      setExercises([]);
    }
  }, [routines, selectedDate]);

  //장바구니에 추가부분
  const handleGoCartClick = async (
    storedUserId: string,
    exerciseId: string
  ) => {
    if (!storedUserId) {
      console.error("로그인이 필요합니다.");
      setError("사용자 ID가 필요합니다.");
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      //중복체크부분에서 백부분에서 exercise부분에 +1을 해주고있는듯 하여 중복체크가 되고있지 않다.
      const response = await basketAPI.readBasket(parseInt(storedUserId));
      const cartItems: ExerciseItem[] = response.data.data;
      const cartItemIds = cartItems.map(
        (item: ExerciseItem) => item.exerciseId
      );

      if (cartItemIds.includes(parseInt(exerciseId))) {
        alert("이미 장바구니에 추가된 운동입니다.");
        return;
      }
      await RoutineAPI.createExerciseBasket(
        parseInt(storedUserId),
        parseInt(exerciseId)
      );
      console.log("장바구니에 추가 완료:", storedUserId, exerciseId);
      alert("장바구니에 추가 완료");
    } catch (error) {
      console.error("장바구니 추가 중 에러 발생", error);
      setError("장바구니에 추가하는데 실패했습니다. 다시 시도해주세요.");
      alert("장바구니에 추가하는데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleCheckboxChange = async (exerciseId: number) => {
    // 체크박스 상태를 먼저 변경
    setExercises((currentExercises: any[]) =>
      currentExercises.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? { ...exercise, success: !exercise.success }
          : exercise
      )
    );
    try {
      // 변경된 상태를 서버에 반영
      await RoutineAPI.checkExercise(exerciseId);
      console.log("운동 상태 변경 성공");
    } catch (error) {
      console.error("운동 상태 변경 실패", error);

      // 서버 요청 실패 시 롤백--

      setExercises((currentExercises: any[]) =>
        currentExercises.map((exercise) =>
          exercise.exerciseId === exerciseId
            ? { ...exercise, success: !exercise.success } // 다시 이전 상태로 되돌림
            : exercise
        )
      );
      alert("운동 상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (error) {
    return <div></div>;
  }
  return (
      <div className={styles.top}>
        <div className={styles.weeklyCalendar}>
          <div className={styles.daysContainer}>
          {days.map((day, index) => (
              <button
                onClick={() => handleDayClick(day.format("YYYY-MM-DD"))}
                key={day.toString()}
                className={`${styles.day} ${
                  day.isSame(today, "day") ? styles.day : ""
                } ${
                  selectedDate === day.format("YYYY-MM-DD")
                    ? styles.selected
                    : ""
                }`}
              >
                <div className={styles.weekday} style={{color:'gray', marginBottom:'13px', fontSize : '15px'}}>{weekdays[index]}</div>
                <div style={{ fontSize:'15px', marginBottom : '10px', position :'relative'}}>
                  {selectedDate === day.format("YYYY-MM-DD") && <div className={styles.circle}></div>}
                  {day.format("DD")}
                </div>
                
              </button>
            ))}
        </div>
      </div>

      <div>
        {error ? (
          <div></div>
        ) : exercises.length > 0 ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>종류</th>
                  <th className={styles.th}>세트</th>
                  <th className={styles.th}>횟수</th>
                  <th className={styles.th}>무게</th>
                  <th className={styles.th}>성공</th>
                  <th className={styles.th}>장바구니에 담기</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise: any, index: any) => (
                  <tr className={styles.tr} key={exercise.exerciseId ?? index}>
                    <td className={styles.td}>{exercise.name}</td>
                    <td className={styles.td}>{exercise.setTime}</td>
                    <td className={styles.td}>{exercise.number}</td>
                    <td className={styles.td}>{exercise.weight}</td>
                    <td
                      className={`${styles.td} ${
                        exercise.success ? styles.success : styles.failure
                      }`}
                    >
                      {exercise.success ? "○" : "x"}
                    </td>
                    <td className={styles.td}>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => {
                          if (!storedUserId) {
                            alert("로그인이 필요합니다.");
                            return;
                          }
                          handleGoCartClick(storedUserId, exercise.exerciseId);
                        }}
                      >
                        <img src = '/add_icon.png' style={{width:'23px', height:'23px', paddingTop : '7px'}}></img>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{color : 'rgb(29, 155, 240)', textAlign:'center'}}>선택한 날짜에 루틴 등록이 되지 않았습니다.</div>
        )}
      </div>
    </div>
  );
}
