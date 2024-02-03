import apiInstance from "../utils/axios";

const axios = apiInstance();

export const inbody = {
    /** 인바디 정보 등록     */
    addInbody : (userId,request) => axios.post(`inbody?userId=${userId}`,request),


    /** 인바디 정보 조회 */
    getinbdoy : (userId) => axios.get(`inbody?userId=${userId}`),

    /** 인바디 정보수정 */
    modifyinbody : (inBodyId,request) => axios.put(`inbody?inBodyId=${inBodyId}`,request),

    


};