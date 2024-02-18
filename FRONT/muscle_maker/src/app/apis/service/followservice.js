import { follows } from "../api/followapi";

const FollowService = {

  /**
   * 팔로잉 요청
   * @param {Object} followRequest - RequestParam: 팔로잉 요청 데이터
   */
  applyFollow: async (followRequest) => {
    try {
      const response = await follows.applyFollow(followRequest);
      return response.data;
    } catch (error) {
      console.error("Error in applyFollow:", error);
      throw error;
    }
  },

  /**
   * 팔로잉 취소
   * @param {string} followerId - PathVariable: 팔로우를 취소하는 사용자 ID
   * @param {string} followingId - PathVariable: 팔로우를 취소당하는 사용자 ID
   */
  cancelFollow: async (followerId, followingId) => {
    try {
      const response = await follows.cancelFollow(followerId, followingId);
      return response.data;
    } catch (error) {
      console.error("Error in cancelFollow:", error);
      throw error;
    }
  },

  /**
   * 팔로우 목록 조회
   * @param userId  - userId
   * @returns {Promise} -.
   */
  getFollowList: async (userId) => {
    try {
      const response = await follows.getFollowList(userId);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error in getFollowList:", error);
      throw error;
    }
  },

};

export default FollowService;
