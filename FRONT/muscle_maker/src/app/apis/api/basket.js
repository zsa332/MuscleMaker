import apiInstance from "../utils/axios"; 

const axios = apiInstance();



export const basket = {

    /** request = (routineId , exerciseId) */
    moveExerciseBasketToRoutine : (request) => axios.post(`basket`, request),

    /**cofnig 헤더 설정 */
    removeExerciseAtBasket : (config) => axios.delete(`basket`,config),

    /** userId = param */
    readBasket : (userId) => axios.get(`basket?userId=${userId}`),



};