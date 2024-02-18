type ClubAchieveData = {
   message: string;
   data: {
     completionPercent: number;
     exp: number;
     successDays: number;
     calender: {
       year: number;
       month: number;
       detail: Array<{
         day: number;
         percent: number;
       }>;
     };
   };
 };
 

export async function ClubAchive(): Promise<ClubAchieveData> {
   const dummyData: ClubAchieveData = {
    "message": "사용자가 속한 클럽 조회 성공",
    "data": {
              "completionPercent" : 90,
              "exp" : 80,
              "successDays" : 100,
              "calender" : {
                    "year" : 2023,
                    "month" : 12,
                    "detail" :[
                           {
                              "day" : 1,
                              "percent" : 0
                           },
                           {
                              "day" : 2,
                              "percent" : 10
                           },
                           {
                              "day" : 3,
                              "percent" : 90
                           },
                           {
                              "day" : 4,
                              "percent" : 100,
                           }
                    ]
               }
            }
   }




    // 더미 데이터를 비동기적으로 반환
   return new Promise((resolve) => {
   // 가짜 지연 시간 설정 (예시)
   setTimeout(() => {
      resolve(dummyData);
   }, 0); // 0초의 가짜 지연 시간
   });
}
