import apiInstance  from '../utils/axios';
import multiApi from '../utils/multiaxios';


const axios = apiInstance();
const multi  = multiApi(); 

export const feeds = {

  /**추천피드, userId  */
  recommendFeed : (userId) => axios.get(`/feeds/recommend/${userId}`),

 /**개인피드조회 */
  getMyFeed : (userId) => axios.get(`/feeds/${userId}`),

   /**전체피드조회 */
   getAllFeed : () => axios.get(`/feeds`),
 
 /** 조회한 사람의 프로필 피드 */
  getIndividualFeed : (userId,individualId) => axios.get(`feeds/${userId}/${individualId}`),

 /** 팔로우 피드 조회 */
  getFollowFeed : (userId) => axios.get(`feeds/follow/${userId}`),

 /** 운동 클럽 피드 조회 */
  getExerciseFeed : (userId) => axios.get(`feeds/exercise/${userId}`),

 /** 푸드클럽 피드 조회 */
 getFoodFeed : (userId) => axios.get(`feeds/food/${userId}`),

 /** 피드 검색*/
 searchFeed : (keyword) => axios.get(`feeds/search?keyword=${keyword}`),

 /** formdata : img는 img파일 , feedDto는 JSON   
  formData.append('feedDto', JSON.stringify(feedDto));
  formData.append('img', imgFile); // 이미지 파일 추가 */
 writeFeed : (formdata) => multi.post(`feeds/write`, formdata),

 getbaseinfo : (userId) => axios.get(`users/base/${userId}`),

 /** feedDto*/
 deleteFeed : (feedDto) => axios.post(`feed/delete`,feedDto),

 /** 클럽 피드 조회 */
 getClubFeeds : (clubId) => axios.get(`feeds/club?clubId=${clubId}`),

//-----------------------------------아래는 코멘트--------------------------------------------
 
 /** 피드 댓글 확인 */
 getComment : (feedId) => axios.get(`feeds/comments/${feedId}`),

 /** 피드 댓글 등록 , commentDto */
commentwrite : (commentDto) => axios.post(`feeds/comments`, commentDto),

/** 피드 댓글 수정하기 ,commentDto */
commentmodify : (commentDto) => axios.put(`feeds/comments`,commentDto),

 /** commentId 번호 삭제*/
commentdelete : (commentId) => axios.delete(`feeds/comments/${commentId}`),
 
 /** 피드 좋아요 추가 */
feedLike : (userId,feedId) => axios.get(`feeds/favorites/${userId}/${feedId}`),
 
/**  내가 좋아요 한 목록 추출*/
getLikeFeed : (userId) => axios.get(`/feeds/favorites/${userId}`),

};
