import { basket } from '../api/basketApi';

const BasketService = {
  /**
   * @param {string} myRoutineId
   * @param {string} exerciseId - DTO
   * @returns {Promise} - 비동기
   */
  moveExerciseBasketToRoutine: async (myRoutineId, exerciseId) => {
    try {
      const response = await basket.moveExerciseBasketToRoutine(myRoutineId, exerciseId);
      return response.data;
    } catch (error) {
      console.error('Error in moveExerciseBasketToRoutine:', error);
      throw error;
    }
  },

  /**
   * @param {Object} config 
   * @returns {Promise}
   */
  removeExerciseAtBasket: async (config) => {
    try {
      // `config`에서 `exerciseId`를 추출합니다.
      const { exerciseId } = config;

      // `axios.delete` 메소드를 사용하여 요청을 보내고, 요청 헤더에 `exerciseId`를 포함시킵니다.
      const response = await basket.removeExerciseAtBasket({ headers: { "exerciseId": exerciseId } });

      // 서버로부터 받은 응답 데이터를 반환합니다.
      return response.data;
    } catch (error) {
      console.error('Error in removeExerciseAtBasket:', error);
      throw error;
    }
  },


  /**
   * @param {string} userId  PathVariable 
   * @returns {Promise} 
   */
  readBasket: async (userId) => {
    try {
      const response = await basket.readBasket(userId);
      return response.data;
    } catch (error) {
      console.error('Error in readBasket:', error);
      throw error;
    }
  },
};

export default BasketService;
