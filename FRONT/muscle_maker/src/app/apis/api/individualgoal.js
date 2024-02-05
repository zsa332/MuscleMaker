import apiInstance  from "../utils/axios";

const axios = apiInstance();


export const individualGoal = {

    /** 개인 목표 불러오기 */
    getIndividualGaol : (userId) => axios.get(`individualGoal/${userId}`),

    writeIndividualGoal : (individiualGoalResponse) => axios.get(`individualGoal/write`,individiualGoalResponse),

    deleteIndividualGoal : (userId) => axios.post(`individualGoal/${userId}`),

    

};