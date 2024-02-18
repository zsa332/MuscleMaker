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
  data: Array<{
    routineId: number;
    title: string | null;
    date: string;
    whichDay: number;
    exerciseResponseList: ExerciseResponse[];
  }>;
}

export async function fetchUserWeekRoutine(userId: string, date: string): Promise<RoutineResponse> {
  // 더미 데이터 생성
  const dummyData: RoutineResponse = {
    "message": "이번주 루틴 조회 성공",
    "data": [
        {
            "routineId": 64,
            "title": null,
            "date": "2024-02-05",
            "whichDay": 1,
            "exerciseResponseList": [
                {
                    "exerciseId": 5,
                    "name": "ㅁㅇㄴㄹ",
                    "setTime": 1,
                    "number": 1,
                    "success": false,
                    "weight": 1
                },
                {
                    "exerciseId": 6,
                    "name": "1312",
                    "setTime": 132,
                    "number": 123,
                    "success": false,
                    "weight": 123
                },
                {
                    "exerciseId": 7,
                    "name": "123",
                    "setTime": 123,
                    "number": 132,
                    "success": true,
                    "weight": 132
                },
                {
                    "exerciseId": 12,
                    "name": "찬의프레스ㅁㄹㄴ",
                    "setTime": 3,
                    "number": 20,
                    "success": false,
                    "weight": 30
                }
            ]
        },
        // 더미 데이터의 나머지 부분...
        {
            "routineId": 70,
            "title": null,
            "date": "2024-02-11",
            "whichDay": 7,
            "exerciseResponseList": [
                {
                    "exerciseId": 1,
                    "name": "찬의프레스",
                    "setTime": 3,
                    "number": 20,
                    "success": false,
                    "weight": 30
                }
            ]
        }
    ]
  };

  // 가짜 지연 시간을 사용하여 비동기적으로 더미 데이터 반환
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500); // 0.5초 지연
  });
}
