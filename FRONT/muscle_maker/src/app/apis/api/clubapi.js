import apiInstance from '../utils/axios';
import multiApi from '../utils/multiaxios';


const axios = apiInstance();
const multi  = multiApi(); 

export const clubs = {

/**  클럽 기본 정보 조회 */  
getClubInfo: (clubId) => axios.get(`clubs/${clubId}`),

/** 클럽 멤버 조회*/   
getClubMembers: (clubId) => axios.get(`clubs/members/${clubId}`),

/** 클럽 등록  */
writeClub : (userId,clubRegistRequest) => multi.post(`clubs?userId=${userId}`,clubRegistRequest),

/** 클럽 수정  */
updateClub : (userId,clubRegistRequest) => axios.put(`clubs/${userId}`,clubRegistRequest),

/** 캘린더 정보 조회 */
getClubCalendar : (clubId,year, month) => axios.get(`clubs/calendar/${clubId}?month=${month}&year=${year}`),

/** 추천 클럽 */
getRecommendationClubs: (userId, sorting) => axios.get(`clubs/recommendation?userId=${userId}&sorting=${sorting}`),



searchclub : (keyword) => axios.get(`clubs/search?keyword=${keyword}`),

};
