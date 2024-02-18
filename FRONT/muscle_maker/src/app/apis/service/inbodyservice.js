import { inbody } from "../api/inbodyapi";

const InbodyService = {

  /**
   * 인바디 정보 등록
   * @param {string} userId - RequestParam: 사용자 ID
   * @param {Object} request - Request body: 인바디 정보 데이터
   * @returns {Promise} - .
   */
  addInbody: async (userId, request) => {
    try {
      const response = await inbody.addInbody(userId, request);
      return response.data;
    } catch (error) {
      console.error("Error in addInbody:", error);
      throw error;
    }
  },

  /**
   * 인바디 정보 조회
   * @param {string} userId - RequestParam: 사용자 ID
   * @returns {Promise} - .
   */
  getInbody: async (userId) => {
    try {
      const response = await inbody.getInbody(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getInbody:", error);
      throw error;
    }
  },

  /**
   * 인바디 정보 수정
   * @param {string} inBodyId - RequestParam: 인바디 정보 ID
   * @param {Object} request - Request body: 수정할 인바디 정보 데이터
   * @returns {Promise} - .
   */
  modifyInbody: async (inBodyId, request) => {
    try {
      const response = await inbody.modifyInbody(inBodyId, request);
      return response.data;
    } catch (error) {
      console.error("Error in modifyInbody:", error);
      throw error;
    }
  },

};

export default InbodyService;
