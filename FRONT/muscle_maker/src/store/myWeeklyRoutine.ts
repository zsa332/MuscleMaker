// axios 임포트
import axios from 'axios';

// 응답 데이터의 타입 정의
interface RoutineResponse {
  // 이곳에 서버 응답 데이터 구조에 맞는 타입을 정의하세요.
  // 예시:
  routineId: number;
  title: string;
  settings: boolean;
  date: string;
  whichDay: number;
  exerciseResponseList: ExerciseResponse[];
}

interface ExerciseResponse {
  exerciseId: number;
  name: string;
  setTime: number;
  number: number;
  success: boolean;
  weight: string;
}