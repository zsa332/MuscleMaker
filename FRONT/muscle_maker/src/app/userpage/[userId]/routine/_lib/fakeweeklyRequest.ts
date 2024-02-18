import axios from 'axios';

const apiUrl = "https://back.muscle-maker.site/";
const fakeAxios = {
  get: async (url: string, config: any) => {
    if (url === 'https://back.muscle-maker.site/routines/1') {
      // Simulate a successful response
      return {
        status: 200,
        data: {
          message: "이번 주 루틴 조회 성공",
          data: {
            routineInfo: [
              {
                routineId: 11234,
                title: "가슴 운동",
                date: "2024-01-12",
                setting: true,
                whichDay: "1",
                exerciseInfo: [
                  {
                    exerciseId: 123,
                    name: "윗몸일으키기",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    exerciseId: 124,
                    name: "푸쉬업",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    exerciseId: 125,
                    name: "벤치프레스",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "달리기",
                    set_time: 30,
                    number: 1,
                    success: false,
                    weight: "50~70",
                    type: true,
                  },
                ],
              },
              {
                // Empty routine
              },
              {
                routine_id: "11234",
                title: "가슴 운동",
                date: "2024-01-12",
                setting: true,
                whichDay: "3",
                exerciseInfo: [
                  {
                    name: "윗몸일으키기",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "푸쉬업",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "벤치프레스",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "달리기",
                    set_time: 30,
                    number: 1,
                    success: false,
                    weight: "50~70",
                    type: true,
                  },
                ],
              },
              {
                routine_id: "11234",
                title: "가슴 운동",
                date: "2024-01-12",
                setting: true,
                whichDay: "4",
                exerciseInfo: [
                  {
                    name: "윗몸일으키기",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "푸쉬업",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "벤치프레스",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "달리기",
                    set_time: 30,
                    number: 1,
                    success: false,
                    weight: "50~70",
                    type: true,
                  },
                ],
              },
              {
                routine_id: "11234",
                title: "가슴 운동",
                date: "2024-01-12",
                setting: true,
                whichDay: "5",
                exerciseInfo: [
                  {
                    name: "윗몸일으키기",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "푸쉬업",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "벤치프레스",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "달리기",
                    set_time: 30,
                    number: 1,
                    success: false,
                    weight: "50~70",
                    type: true,
                  },
                ],
              },
              {
                routine_id: "11234",
                title: "가슴 운동",
                date: "2024-01-12",
                setting: true,
                whichDay: "6",
                exerciseInfo: [
                  {
                    name: "윗몸일으키기",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "푸쉬업",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "벤치프레스",
                    set_time: 3,
                    number: 20,
                    success: false,
                    weight: "50~70",
                    type: false,
                  },
                  {
                    name: "달리기",
                    set_time: 30,
                    number: 1,
                    success: false,
                    weight: "50~70",
                    type: true,
                  },
                ],
              },
            ],
          },
        },
      };
    } else {
      // Simulate an error response
      return {
        status: 400,
        data: {
          message: "설정한 루틴이 없습니다.",
        },
      };
    }
  },
};

export default fakeAxios;
