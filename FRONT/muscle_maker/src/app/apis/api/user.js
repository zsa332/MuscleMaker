import apiInstance from "../utils/axios";
import multiApi from "../utils/multiaxios";
const axios = apiInstance();
const api = multiApi();

export const users = {

    /** 1. 회원가입  */
    signup: (formData) => api.post(`users/join`, formData),

    /** 2. 로그인 */
    authorize : (loginDto) => axios.post(`users/login`,loginDto),

    /** 3. 사용자가 속한 클럽 조회 */
    getClubContainUser: (userId) => axios.get(`users/clubs?userId=${userId}`),
    
    /**  4. 클럽 가입 신청*/
    applyClub : (clubTransitRequest) => axios.post(`users/clubs/join`,clubTransitRequest),

    /**  5. 클럽 탈퇴 , config = clubId,userId*/
    leaveClub : (userId, clubId) => axios.delete(`users/clubs/leave`,{
      headers:{
        "userId" : userId,
        "clubId" : clubId 
      }
    }),

    /**  6 가입 승낙 */
    acceptClubMember: (clubId,clubLeaderRequest) => axios.put(`users/clubs/join/${clubId}`,clubLeaderRequest),

    /** 7 가입 거절  config : 헤더(leaderId, memberId) */
    refuseClubMember : (clubId,leaderId, memberId) => axios.delete(`users/clubs/join/${clubId}`,{
      headers: {
        "leaderId" : leaderId,
        "memberId" : memberId
      }
    }),

    /** 8 사용자 추방 config : 헤더(leaderId, memberId) */
    fireClubMember : (clubId,config) => axios.delete(`users/clubs/fire/${clubId}`,config),

    /** 9 */
    achieveTarget: (clubTransitRequest) => axios.post(`users/clubs/target`,clubTransitRequest),

    /** 10 사용자 기본 정보 조회 */
    getMyUserInfo: () => axios.get(`users`),

    /**  11 개인 정보 수정 / formd형태   */
    updateUserInfo: (form) => axios.put(`users`,form),

    /** 12 config = 헤더 설정*/
    updatePassword : (ModifyPasswordRequest,config) => axios.put(`users/password`,ModifyPasswordRequest,config),
      /** 13 카카오콜백*/
    kakaoCallBack: (code) => axios.get(`users/kakao/callback?code=${code}`),

      /** 14 카카오 회원가입 , config = 헤더 toekn넣어줘야함  */
    joinKakao: (userInfoRequest,config) => axios.post(`users/kakao/join`,
      userInfoRequest,
      {
        headers:{
          "token" : config
        }
      }
    ),
    searchUser : (keyword) => axios.get(`/users/search?keyword=${keyword}`),
    

 
};