import apiInstance from "../utils/axios"; 

const axios = apiInstance();



export const basket = {

    /** request = (routineId , exerciseId) */
    moveExerciseBasketToRoutine : (myRoutineId,exerciseId) => axios.post(`basket?myRoutineId=${myRoutineId}?exerciseId=${exerciseId}`),

    // /**cofnig 헤더 설정 */exerciseId
    removeExerciseAtBasket : (config) => axios.delete(`basket`,config),

    /** userId = param */
    readBasket : (userId) => axios.get(`basket?userId=${userId}`),



};