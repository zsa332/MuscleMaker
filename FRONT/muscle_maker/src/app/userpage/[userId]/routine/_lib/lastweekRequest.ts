export async function lastweekRequest(userId: any) {
  // 더미 데이터 생성 (예시)
  const dummyData = {
    "message": "루틴 조회 성공",
    "data": {
        "routineInfo": [
                      {
                            "routineId": 11234,
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "0", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "exerciseId" : 123,
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "exerciseId" : 124,
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "exerciseId" : 125,
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      },
                      {
                            "routineId": 11234,
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "1", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      },
                      {
                            "routine_id": "11234",
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "3", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      },
                      {
                            "routine_id": "11234",
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "4", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      },
                      {
                            "routine_id": "11234",
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "5", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      },
                      {
                            "routine_id": "11234",
                            "title": "가슴 운동",
                            "date": "2024-01-12",
                            "setting" : true,
                            "whichDay": "6", //월요일0 화요일1 수요일2 ....
                            "exerciseInfo": [
                                         {
                                             "name" : "윗몸일으키기",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "푸쉬업",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "벤치프레스",
                                             "set_time" : 3,
                                             "number" : 20 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : false// 근력 false 유산소 true
                                          },
                                          {
                                             "name" : "달리기",
                                             "set_time" : 30, // 근력 일때는 세트 횟수, 유산소는 몇분
                                             "number" : 1 ,
                                             "success" : false,
                                             "weight" : "50~70",
                                             "type" : true// 근력 false 유산소 true
                                          }
                            ]
                      }
        ]
    }
}

  // 더미 데이터를 비동기적으로 반환
  return new Promise((resolve) => {
    // 가짜 지연 시간 설정 (예시)
    setTimeout(() => {
      resolve(dummyData);
    }, 500); // 0.5초의 가짜 지연 시간
  });
}
