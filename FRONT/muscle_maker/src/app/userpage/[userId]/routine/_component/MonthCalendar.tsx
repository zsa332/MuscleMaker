import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./MonthCalendar.module.css";
import { routines as RoutineAPI } from "@/app/apis/api/routine";
import { useParams } from "react-router-dom";
import { basket as basketAPI } from "@/app/apis/api/basket";
import SetRoutine from "@/app/(afterLogin)/_component/SetRoutine";
import apiInstance  from "@/app/apis/utils/axios";

type Props = {
  paramsuserId: string
}

interface ExerciseItem {
  exerciseId: number;
  name: string;
  number: number;
  setTime: number;
  success: boolean;
  weight: number;
}

const MonthCalendar = ({ paramsuserId }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const axios = apiInstance();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [exercises, setExercises] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [routines, setRoutines ] = useState([])
  const today = dayjs();
  // const { userId } = useParams();
  const firstDayOfMonth = currentMonth.startOf("month").day();
  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => {
      return dayjs(new Date(currentMonth.year(), currentMonth.month(), i + 1));
    }
  );
  const daysArray = new Array(firstDayOfMonth).fill(null).concat(daysInMonth);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const [storedUserId, setStoredUserId] = useState<string>("0");
  const ParamsUserId = paramsuserId;
  
  const loadWeeklyData =  () => {
    axios.get(`https://back.muscle-maker.site/routines/date?userId=${paramsuserId}&date=${selectedDate}`)
    .then(
      (res) => {
        const responseData = res.data.data.exerciseResponseList

        if(responseData==null || responseData?.length==0){
          setExercises([])
        }
        else{
          setExercises(responseData)
        }
      }
    )
    .catch(
      (error) => {
        console.log(error);
        setExercises([])
      }
    )
  }; 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId2 = localStorage?.getItem("userId");
      const today = dayjs().format("YYYY-MM-DD")
      if (storedUserId2) {
        setSelectedDate(today)
        setStoredUserId(storedUserId2);
      }
    }
    else if (storedUserId === "0") {
      setError("로그인이 필요합니다.");
      return;
    }
  },[]); 

  useEffect(() => {
    console.log(selectedDate, "선택한 날짜 입니다.");
    loadWeeklyData();
  }, [selectedDate]);

  

  const handleDayClick = (day: dayjs.Dayjs | null) => {
    if (day) {
      setSelectedDate(day.format("YYYY-MM-DD"));
    }
  };

  const handleGoCartClick = async (storedUserId: string, exerciseId: string) => {
    
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


  return (
    <div>
      <div className={styles.calendarContainer}>
        <div className={styles.navigationButtons}>
          <button onClick={previousMonth} style={{backgroundColor:'transparent'}}>
            <img style = {{width:'30px', height:'30px'}} src = '/left_icon.png'></img>
          </button >
          <h2>{currentMonth.format("YYYY년 MM월")}</h2>
          <button onClick={nextMonth} style={{backgroundColor:'transparent'}}>
            <img style = {{width:'30px', height:'30px'}} src = '/right_icon.png'></img>
          </button>
        </div>
        <div className={styles.weekdaysContainer}>
          {weekdays.map((day) => (
            <div key={day} className={styles.dayName}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.daysGrid}>
          {daysArray.map((day, index) => {
            // '오늘' 날짜인지 확인
            const isToday = day && day.isSame(today, "day");
            return (
              <button
                key={index}
                className={`${styles.day} ${isToday ? styles.today : ""} ${
                  day && selectedDate === day.format("YYYY-MM-DD")
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day ? day.format("DD") : ""}
              </button>
            );
          })}
        </div>
      </div>

      <div>
      {error ? (
        <div style={{marginTop:'40px'}}>&nbsp;</div>
      ) : (
        <>
          {exercises.length === 0 ? (
            <div>
              <p>운동이 없습니다.</p>
            </div>
          ) : (
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
                {exercises.map((exercise, index) => (
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
                      {exercise.success ? "○" : "×"}
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
                        <img src="/add_icon.png" style={{width:'23px', height:'23px', paddingTop : '7px'}} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* 운동이 없는 경우 메시지 */}
          {exercises.length === 0 && (
            <div style={{color : 'rgb(29, 155, 240)', textAlign:'center'}}>선택한 날짜에 루틴 등록이 되지 않았습니다.</div>
          )}
        </>
      )}
    </div>
  </div>
)};

export default MonthCalendar;
