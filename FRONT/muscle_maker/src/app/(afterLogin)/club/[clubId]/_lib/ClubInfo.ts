export async function ClubInfo () {
   
  const dummyData = {
      "status": 200,
      "message": "클럽 정보 조회 성공",
      "data": {
         "category" : false,
         "title" : "김계란이 되자 클럽",
         "level" : 12,
         "created_at" : "2024-01-12",
         "goal" : "맨날 운동하기",
         "club_achieve" : [
               {
               "date" : "2024-01-23",
               "achieve_percent" : 70
               },
               {
               "date" : "2024-01-24",
               "achieve_percent" : 80
               },
               {
               "date" : "2024-01-25",
               "achieve_percent" : 100
               }
         ],
         "club_mem" : 100
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
