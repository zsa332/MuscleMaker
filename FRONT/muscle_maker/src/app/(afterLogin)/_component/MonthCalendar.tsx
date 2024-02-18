import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./MonthCalendar.module.css";
import { routines as RoutineAPI } from "@/app/apis/api/routine";
import { useParams } from "react-router-dom";
import axios from "axios";

const MonthCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [exercises, setExercises] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const today = dayjs();
  const { userId } = useParams();

  const firstDayOfMonth = currentMonth.startOf("month").day();

  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => {
      return dayjs(new Date(currentMonth.year(), currentMonth.month(), i + 1));
    }
  );
  const daysArray = new Array(firstDayOfMonth).fill(null).concat(daysInMonth);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const previousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const [storedUserId, setStoredUserId] = useState<string>("0");

  const loadWeeklyData =  () => {
    axios.get(`https://back.muscle-maker.site/routines/date?userId=${storedUserId}&date=${selectedDate}`)
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
                onClick={() => day && handleDayClick(day)}
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>종류</th>
                <th className={styles.th}>세트</th>
                <th className={styles.th}>횟수</th>
                <th className={styles.th}>무게</th>
                <th className={styles.th}>성공</th>
              </tr>
            </thead>
            <tbody>
              {exercises &&
                exercises.map((exercise, index) => (
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
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {/* 운동 목록이 없는 경우 메시지 */}
      <div>
        {exercises.length === 0 && (
          <div style={{color: 'rgb(29, 155, 240)', textAlign: 'center', marginTop: '20px'}}>선택한 날짜에 루틴 등록이 되지 않았습니다.</div>
        )}
      </div>
    </div>
    
  );
};

export default MonthCalendar;
