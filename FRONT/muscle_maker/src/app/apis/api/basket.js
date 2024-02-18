import apiInstance from "../utils/axios"; 

const axios = apiInstance();



export const basket = {

    /** request = (routineId , exerciseId) */
    moveExerciseBasketToRoutine : (userId,exerciseId,whichDay) => axios.post(`basket?userId=${userId}&exerciseId=${exerciseId}&whichDay=${whichDay}`),

    // /**cofnig 헤더 설정 */exerciseId
    removeExerciseAtBasket : (config) => axios.delete(`basket`,config),

    /** userId = param */
    readBasket : (userId) => axios.get(`basket?userId=${userId}`),


};