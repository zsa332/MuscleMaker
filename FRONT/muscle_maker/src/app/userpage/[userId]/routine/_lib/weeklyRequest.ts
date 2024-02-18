import axios from 'axios';

const apiUrl = "https://back.muscle-maker.site/";

// 특정 사용자의 루틴 정보를 가져오는 함수
export const fetchUserRoutine = async (userId: number) => {
  const url = `${apiUrl}routines?userId=${userId}`;
  console.log("루틴 정보 url", url);

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data; // API 응답에서 데이터 반환
    } else {
      console.error("API 요청 실패 - 상태 코드:", response.status);
      throw new Error("API 요청 실패");
    }
  } catch (error) {
    // 에러 처리
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
