// import axios
import axios from "axios";
// 전역 설정
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

// basic Instance
const apiInstance = () => {
  let token = 1;
  if (typeof localStorage !== 'undefined') {
      const localStorageToken = localStorage.getItem("token");
      if (localStorageToken) {
          token = localStorageToken;
      }
  }
  

  const instance = axios.create({
    // baseURL: 'http://localhost:8080/',

    baseURL: "https://back.muscle-maker.site/",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return instance;
};




export default apiInstance ;
