import apiInstance  from "../utils/axios";

const axios = apiInstance();

export const routines = {

    /** 내 루틴 조회 */
    findMyRoutines : (userId) => axios.get(`routines/my-routines?userId=${userId}`),

    /** 루틴 등록 */
    writeRoutine : (userId,request) => axios.post(`routines/settings?userId =${userId}`,request),

    /**  이번주 루틴 조회*/
    findThisWeekRoutine : (userId) => axios.get(`routines?userId=${userId}`),

    /**  운동 완료 선택, 해제*/
    checkExercise : (exerciseId) => axios.put(`routines/exercises?exerciseId=${exerciseId}`),

    /**  해당 날짜 루틴 조회*/
    findExercise : (userId,date) => axios.get(`routines/date?userId=${userId}&date=${date}`),

    /** 운동 루틴 업데이트*/
    modifyExercise : (exerciseId,request) => axios.put(`routines/settings/exercises?exerciseId=${exerciseId}`,request),

    /** 헤더에 value =exerciseId 담아야함 */
    deleteExercise : (config) => axios.delete(`routines/settings/exercises`,config),
 
    /** 루틴에 운동 추가   */
    createExercise: (userId, whichDay, request) => axios.post(`routines/settings/exercises?userId=${userId}&whichDay=${whichDay}`,request),


    /** 운동 장바구니에 담기 */
    createExerciseBasket : (userId,exerciseId) => axios.post(`routines/basket?userId=${userId}&exerciseId=${exerciseId}`),

    

};