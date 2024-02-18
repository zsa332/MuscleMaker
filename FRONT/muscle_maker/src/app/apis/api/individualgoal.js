import apiInstance  from "../utils/axios";
import api from 'axios';

const axios = apiInstance();


export const individualGoal = {

    /** 목표 조회 */
    getIndividualGaol : (userId) => axios.get(`individual-goal?userId=${userId}`),

    writeIndividualGoal : (userId, individiualGoalResponse) => axios.post(`individual-goal?userId=${userId}`,individiualGoalResponse),

    updateIndividualGoal : (individualGoalId,individiualGoalResponse) =>axios.put(`individual-goal?individualGoalId=${individualGoalId}`,individiualGoalResponse),
    
    deleteIndividualGoal  : (individualGoalId) => axios.delete(`individual-goal`,{
        headers: {
            'individualGoalId': individualGoalId
          }
    }),

};