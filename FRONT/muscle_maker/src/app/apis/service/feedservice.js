import { feeds } from "../api/feedapi";

const FeedService = {

  /**
   * 추천 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - 
   */
  recommendFeed: async (userId) => {
    try {
      const response = await feeds.recommendFeed(userId);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error in recommendFeed:", error);
      throw error;
    }
  },


  /**
   * 추천 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - 
   */
  getAllFeed: async () => {
    try {
      const response = await feeds.getAllFeed();
      return response.data;
    } catch (error) {
      console.error("Error in recommendFeed:", error);
      throw error;
    }
  },

  /**
   * 개인 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - 
   */
  getMyFeed: async (userId) => {
    try {
      const response = await feeds.getMyFeed(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getMyFeed:", error);
      throw error;
    }
  },

  /**
   * 조회한 사람의 프로필 피드 조회 
   * @param {string} userId - PathVariable: 사용자 ID
   * @param {string} individualId - PathVariable: 조회 대상 사용자 ID
   * @returns {Promise} -
   */
  getIndividualFeed: async (userId, individualId) => {
    try {
      const response = await feeds.getIndividualFeed(userId, individualId);
      return response.data;
    } catch (error) {
      console.error("Error in getIndividualFeed:", error);
      throw error;
    }
  },
 /**
   * 팔로우 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise}
   */
 getFollowFeed: async (userId) => {
    try {
      const response = await feeds.getFollowFeed(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getFollowFeed:", error);
      throw error;
    }
  },

  /**
   * 운동 클럽 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} 
   */
  getExerciseFeed: async (userId) => {
    try {
      const response = await feeds.getExerciseFeed(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getExerciseFeed:", error);
      throw error;
    }
  },

  /**
   * 푸드 클럽 피드 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} -
   */
  getFoodFeed: async (userId) => {
    try {
      const response = await feeds.getFoodFeed(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getFoodFeed:", error);
      throw error;
    }
  },

  /**
   * 피드 검색
   * @param {string} keyword - RequestParam: 검색 키워드
   * @returns {Promise} - 
   */
  searchFeed: async (keyword) => {
    try {
      const response = await feeds.searchFeed(keyword);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error in searchFeed:", error);
      throw error;
    }
  },

/**
   * 피드 작성
   * @param {FormData} formdata -  img  , feedDto 형태로 보내야함 Header : multipart/form-data
   * @returns {Promise} 
   */
writeFeed: async (formdata) => {
    try {
      const response = await feeds.writeFeed(formdata);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(formdata);
      console.error("Error in writeFeed:", error);
      throw error;
    }
  },

  /**
   * 피드 삭제
   * @param {Object} feedDto - RequestParam: 피드 데이터
   * @returns {Promise} 
   */
  deleteFeed: async (feedDto) => {
    try {
      const response = await feeds.deleteFeed(feedDto);
      return response.data;
    } catch (error) {
      console.error("Error in deleteFeed:", error);
      throw error;
    }
  },

  //-----------------------------------아래는 코멘트--------------------------------------------

  /**
   * 피드 댓글 확인
   * @param {string} feedId - PathVariable: 피드 ID
   * @returns {Promise} - 
   */
  getComment: async (feedId) => {
    try {
      const response = await feeds.getComment(feedId);
      return response.data;
    } catch (error) {
      console.error("Error in getComment:", error);
      throw error;
    }
  },

  /**
   * 피드 댓글 등록
   * @param {Object} commentDto - RequestParam: 댓글 데이터
   * @returns {Promise} - 
   */
  commentWrite: async (commentDto) => {
    try {
      const response = await feeds.commentwrite(commentDto);
      return response.data;
    } catch (error) {
      console.error("Error in commentWrite:", error);
      throw error;
    }
  },

  /**
   * 피드 댓글 수정
   * @param {Object} commentDto - RequestParam: 댓글 데이터
   * @returns {Promise} -
   */
  commentModify: async (commentDto) => {
    try {
      const response = await feeds.commentModify(commentDto);
      return response.data;
    } catch (error) {
      console.error("Error in commentModify:", error);
      throw error;
    }
  },

  /**
   * 피드 댓글 삭제
   * @param {string} commentId - PathVariable: 댓글 ID
   * @returns {Promise} -
   */
  commentDelete: async (commentId) => {
    try {
      const response = await feeds.commentDelete(commentId);
      return response.data;
    } catch (error) {
      console.error("Error in commentDelete:", error);
      throw error;
    }
  },

  /**
   * 피드 좋아요 추가
   * @param {string} userId - PathVariable: 사용자 ID
   * @param {string} feedId - PathVariable: 피드 ID
   * @returns {Promise} -
   */
  feedLike: async (userId, feedId) => {
    try {
      const response = await feeds.feedLike(userId, feedId);
      return response.data;
    } catch (error) {
      console.error("Error in feedLike:", error);
      throw error;
    }
  },

  /**
   * 내가 좋아요 한 목록 추출
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} -
   */
  getLikeFeed: async (userId) => {
    try {
      const response = await feeds.getLikeFeed(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getLikeFeed:", error);
      throw error;
    }
  },




};

export default FeedService;
