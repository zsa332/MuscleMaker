// import axios
import axios from "axios";
import setInterceptros from "apis/utils/interceptor";

// 전역 설정
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

// basic Instance
const apiInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      // Authorization: `Bearer `, 향후 추가
    },
  });
  return instance;
};

export default apiInstance;
