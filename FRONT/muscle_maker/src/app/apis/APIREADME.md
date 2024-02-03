
1. 파라미터가 Config로 되어있는 경우 Header에 내용을 담아야함
2. 파라미터가 formdata면 Content-Type : multipart/form-data 로 바꾸고, img : file , 나머지는 JSON 형태로 보내야함
3. 기본 경로 URL 설정  =>  src/app/apis/utils/axios.js 에서 변경 
4. 반환 타입은 {message , data} 로 들어올 거임. 자기가 필요한 키값 매칭해서 활용 