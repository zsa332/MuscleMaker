import React, { useEffect, useState } from 'react';
import { basket } from '@/app/apis/api/basket';
import { routines } from '@/app/apis/api/routine';
import styles from "@/app/mypage/routine/_component/routinecart.module.css"
// ExerciseItem.tsx 또는 RoutineCart.tsx와 같은 파일 내부

interface ExerciseItemProps {
  exercise: Exercise;
  onRemove: (exerciseId: number) => Promise<void>;
  onMove: (exerciseId: number, routineId: number) => Promise<void>;
  routineOptions: EX[]; // 이번 주 루틴 목록
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onRemove, onMove, routineOptions }) => {
  const [selectedDay, setSelectedDay] = useState(''); //선택된 날짜
  const dayMapping = ["월", "화", "수", "목", "금", "토", "일"];


  const handleMoveToRoutine = () => {
    const routine = routineOptions.find(r => r.whichDay.toString() === selectedDay);
    if (routine) {
      onMove(exercise.exerciseId, routine.whichDay).then(() => {
        alert("운동이 내 루틴에 성공적으로 등록 되었습니다.");
      }).catch(error => {
        console.error('Failed to move exercise to routine', error);
      });
    }
  };

  return (
    <div key={exercise.exerciseId}>
      <div className={styles.exerciseItem}>
        <div className={styles.exerciseDetails}>
          <h3 style={{textAlign:'center'}}>{exercise.name}</h3>
          <table>
            <thead>
              <tr >
                <th>세트</th>
                <th>횟수</th>
                <th>무게</th>
              </tr>
            </thead>
            <tbody >
              <tr style={{textAlign:'center'}}>
                <td>{exercise.setTime}</td>
                <td>{exercise.number}</td>
                <td>{exercise.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.selectDay}>
          <select className={styles.selectBox} value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value="" hidden>루틴에 넣고 싶은 요일을 고르세요!</option>
            {routineOptions.map((option) => (
              <option key={option.routineId} value={option.whichDay}>
                {dayMapping[option.whichDay - 1]}요일
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} style={{backgroundColor:'gray'}} onClick={() => onRemove(exercise.exerciseId)}>장바구니에서 삭제</button>
          <button className={styles.button} style = {{backgroundColor:'rgb(29, 155, 240)'}}onClick={handleMoveToRoutine}>나의 루틴에 추가</button>
        </div>
      </div>
    </div>
  );
};


// Exercise 인터페이스 정의
interface Exercise {
  exerciseId: number;
  name: string;
  setTime: number;
  number: number;
  success: boolean;
  weight: number;
}

interface EX {
  whichDay: number;
  routineId: number;
}

const RoutineCart: React.FC = () => {
  const storedUserId = localStorage.getItem("userId") || "";
  const parsedUserId = parseInt(storedUserId || "");
  const [exercises, setExercises] = useState<Exercise[]>([]);//장바구니 조회 운동
  const [getRoutineId, setgetRoutineId] = useState<EX[]>([]);//이번주 루틴 조회(배열)


  //장바구니 조회
  const fetchBasket = async () => {
    if (parsedUserId) {
      try {
        const response = await basket.readBasket(parsedUserId);
        if (response.data) {
          setExercises(response.data.data);
        } else {
          console.log('No exercises found');
        }
      } catch (error) {
        console.error('Failed to fetch basket', error);
      }
    }
  };

  //이번주 루틴조회
  const fetchroutineId = async () => {
    if (parsedUserId) {
      try {
        const response = await routines.findThisWeekRoutine(parsedUserId);
        if (response.data) {
          setgetRoutineId(response.data.data);
        } else {
          console.log('No exercises found');
        }
      } catch (error) {
        console.error('Failed to fetch basket', error);
      }
    }
  };

  useEffect(() => {
    fetchBasket();
    fetchroutineId();
  }, []);

  
  //루틴으로 이동
  const moveExerciseToRoutine = async (exerciseId: number, whichDay: number) => {
    console.log(parsedUserId, "로그인 아이디 확인")
    console.log(whichDay,"날짜 확인하기")
    console.log(exerciseId,"운동아이디 확인하기")
    try {
      const response = await basket.moveExerciseBasketToRoutine(parsedUserId, exerciseId, whichDay);
      fetchBasket(); 
    } catch (error) {
      console.error('Failed to move exercise to routine', error);
    }
  };


  // 장바구니에서 운동 삭제
  const removeExerciseFromBasket = async (exerciseId: number) => {
    const config = {
      headers: { "exerciseId": exerciseId }
    };
    try {
      const response = await basket.removeExerciseAtBasket(config);
      alert("장바구니에서 삭제 되었습니다.")
      fetchBasket();
      console.log('Exercise removed successfully:', response);
    } catch (error) {
      console.error('Failed to remove exercise from basket', error);
    }
  };

  return (
    <div>
    <div className={styles.container}>
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.exerciseId}
          exercise={exercise}
          onRemove={removeExerciseFromBasket}
          onMove={moveExerciseToRoutine}
          routineOptions={getRoutineId}
        />
      ))}
    </div>
  </div>
  );
};

export default RoutineCart;
