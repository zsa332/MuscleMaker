// import axios
import axios from "axios";
// 전역 설정
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해


const multiApi = () => {
    const token = localStorage.getItem('token');
  
    const instance = axios.create({
      baseURL: 'http://localhost:8080/',
      
      // baseURL: "https://back.muscle-maker.site/",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return instance;
  };

  export default multiApi ;
