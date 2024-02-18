// _lib/fakeweeklyRequest.js

// _lib/fakeweeklyRequest.ts
interface ExerciseResponse {
  exerciseId: number;
  name: string;
  setTime: number;
  number: number;
  success: boolean;
  weight: number;
}

interface RoutineResponse {
  message: string;
  data: {
    routineId: number;
    title: string | null;
    date: string;
    whichDay: number;
    exerciseResponseList: ExerciseResponse[];
  };
}

export async function fetchUserDateRoutine(userId: string, date: string): Promise<RoutineResponse> {
  // 더미 데이터 생성
  const dummyData = {
    "message": "해당 날짜 루틴 조회 성공",
    "data": {
      "routineId": 64,
      "title": null,
      "date": date, // 매개변수로 받은 date 사용
      "whichDay": new Date(date).getDay(), // JavaScript의 Date 객체를 사용하여 요일 계산
      "exerciseResponseList": [
        {
          "exerciseId": 5,
          "name": "이지랄",
          "setTime": 1,
          "number": 1,
          "success": false,
          "weight": 1
        },
        {
          "exerciseId": 6,
          "name": "요지랄",
          "setTime": 132,
          "number": 123,
          "success": false,
          "weight": 123
        },
        {
          "exerciseId": 7,
          "name": "개지랄",
          "setTime": 123,
          "number": 132,
          "success": true,
          "weight": 132
        },
        {
          "exerciseId": 12,
          "name": "찬의프레스",
          "setTime": 3,
          "number": 20,
          "success": false,
          "weight": 30
        },
        // 여기에 추가 운동 정보를 포함시킬 수 있습니다.
      ]
    }
  };

  // 가짜 지연 시간을 사용하여 비동기적으로 더미 데이터 반환
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500); // 0.5초 지연
  });
}
