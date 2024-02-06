import apiInstance from '../utils/axios';

const axios = apiInstance();


export const follows = {

    /**  팔로잉 요청*/
    applyFollow : (followRequest) => axios.post(`follows`, followRequest),

    /** 팔로잉 취소 */
    cancelFollow : (followerId,followingId) => axios.delete(`follows?
                    followerId=${followerId}&followingId=${followingId}`),
    /** 팔로우 목록 조회*/
    getFollowList : (userId) => axios.get(`follows?userId=${userId}&sortType=0`),

};