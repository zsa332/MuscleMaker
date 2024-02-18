import { routines } from "../api/routinesapi";

const RoutineService = {

  /**
   * 루틴 등록
   * @param {string} userId - PathVariable: 사용자 ID
   * @param {Object} request - Request body: 루틴 등록 데이터
   * @returns {Promise} - .
   */
  writeRoutine: async (userId, request) => {
    try {
      const response = await routines.writeRoutine(userId, request);
      return response.data;
    } catch (error) {
      console.error("Error in writeRoutine:", error);
      throw error;
    }
  },

  /**
   * 이번주 루틴 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - A Promise that resolves to this week's routines.
   */
  findMyRoutines: async (userId) => {
    try {
      const response = await routines.findMyRoutines(userId);
      return response.data;
    } catch (error) {
      console.error("Error in findMyRoutines:", error);
      throw error;
    }
  },

  /**
   * 이번주 루틴 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - A Promise that resolves to this week's routines.
   */
  findThisWeekRoutine: async (userId) => {
    try {
      const response = await routines.findThisWeekRoutine(userId);
      return response.data;
    } catch (error) {
      console.error("Error in findThisWeekRoutine:", error);
      throw error;
    }
  },

  /**
   * 운동 완료 선택, 해제
   * @param {string} exerciseId - PathVariable: 운동 ID
   * @returns {Promise} - .
   */
  checkExercise: async (exerciseId) => {
    try {
      const response = await routines.checkExercise(exerciseId);
      return response.data;
    } catch (error) {
      console.error("Error in checkExercise:", error);
      throw error;
    }
  },

  /**
   * 해당 날짜 루틴 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @param {string} date - PathVariable: 조회 날짜
   * @returns {Promise} - A Promise that resolves to the routines for the specified date.
   */
  findExercise: async (userId, date) => {
    try {
      const response = await routines.findExercise(userId, date);
      return response.data;
    } catch (error) {
      console.error("Error in findExercise:", error);
      throw error;
    }
  },
  /**
   * 운동 루틴 업데이트
   * @param {string} exerciseId - PathVariable: 운동 ID
   * @param {Object} request - Request body: 업데이트할 운동 루틴 데이터
   * @returns {Promise} - .
   */
  modifyExercise: async (exerciseId, request) => {
    try {
      const response = await routines.modifyExercise(exerciseId, request);
      return response.data;
    } catch (error) {
      console.error("Error in modifyExercise:", error);
      throw error;
    }
  },

  /**
   * 운동 루틴 삭제
   * @param {Object} config - Request header: exerciseId를 담은 config
   * @returns {Promise} - .
   */
  deleteExercise: async (config) => {
    try {
      const response = await routines.deleteExercise(config);
      return response.data;
    } catch (error) {
      console.error("Error in deleteExercise:", error);
      throw error;
    }
  },

  // 루틴에 운동 추가 함수 수정
  /**
   * 루틴에 운동 추가
   * @param {string} userId - 사용자 ID
   * @param {number} whichDay - 어떤 요일에 운동을 추가할지
   * @param {Object} request - Request body: 추가할 운동 데이터
   * @returns {Promise} - .
   */
  createExercise: async (userId, whichDay, request) => {
    try {
      const response = await routines.createExercise(userId, whichDay, request);
      return response.data;
    } catch (error) {
      console.error("Error in createExercise:", error);
      throw error;
    }
  },


  /**
   * 운동 장바구니에 담기
   * @param {string} userId - PathVariable: 사용자 ID
   * @param {string} exerciseId - PathVariable: 운동 ID
   * @returns {Promise} - .
   */
  createExerciseBasket: async (userId, exerciseId) => {
    try {
      const response = await routines.createExerciseBasket(userId, exerciseId);
      return response.data;
    } catch (error) {
      console.error("Error in createExerciseBasket:", error);
      throw error;
    }
  },


};

export default RoutineService;
