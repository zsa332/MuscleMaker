import { users } from "../api/user";

const UserService = {
  /**
   * 회원가입
   * @param {Object} userDto - Request body: 회원가입 데이터
   * @returns {Promise} - .
   */
  signup: async (formData) => {
    try {
      await users.signup(formData);
      // return response.data;
    } catch (error) {
      console.error("Error in signup:", error);
      alert("회원가입에 다른 이메일을 사용해 주세요. 실패했습니다..");
      throw error;
    }
    alert("회원가입에 성공하였습니다.");
  },

  searchuser : async (keyword) =>{
    try{
      const response = await users.searchUser(keyword);
      return response.data;
    } catch (error) {
      console.error("error in searchuser" ,error);
      throw error;
    }
  },


  /**
   * 로그인
   * @param {Object} loginDto - Request body: 로그인 데이터
   * @returns {Promise} - .
   */
  authorize: async (loginDto) => {
    try {
      const response = await users.authorize(loginDto);
      return response.data;
    } catch (error) {
      console.error("Error in authorize:", error);
      throw error;
    }
  },

  /**
   * 사용자가 속한 클럽 조회
   * @param {string} userId - PathVariable: 사용자 ID
   * @returns {Promise} - A Promise that resolves to the user's clubs.
   */
  getClubContainUser: async (userId) => {
    try {
      const response = await users.getClubContainUser(userId);
      return response.data;
    } catch (error) {
      console.error("Error in getClubContainUser:", error);
      throw error;
    }
  },

  /**
   * 클럽 가입 신청
   * @param {Object} clubTransitRequest - Request body: 클럽 가입 신청 데이터
   * @returns {Promise} - .
   */
  applyClub: async (clubTransitRequest) => {
    try {
      const response = await users.applyClub(clubTransitRequest);
      return response.data.message;
    } catch (error) {
      console.error("Error in applyClub:", error);
      throw error;
    }
  },

  /**
   * 클럽 탈퇴
   * @param {Object} config - Request header: 클럽 ID, 사용자 ID
   * @returns {Promise} - .
   */
  leaveClub: async (userId, clubId) => {
    try {
      const response = await users.leaveClub(userId, clubId);
      console.log(response.data);
      return response.data.message;
    } catch (error) {
      console.error("Error in leaveClub:", error);
      throw error;
    }
  },

  /**
   * 가입 승낙
   * @param {string} clubId - PathVariable: 클럽 ID
   * @param {Object} clubLeaderRequest - Request body: 클럽 리더 승낙 데이터
   * @returns {Promise} - .
   */
  acceptClubMember: async (clubId, clubLeaderRequest) => {
    try {
      const response = await users.acceptCulbMember(clubId, clubLeaderRequest);
      return response.data;
    } catch (error) {
      console.error("Error in acceptClubMember:", error);
      throw error;
    }
  },

  /**
   * ... (이전 코드와 동일)
   */

  /**
   * 가입 거절
   * @param {string} clubId - PathVariable: 클럽 ID
   * @param {Object} config - Request header: 클럽 리더 ID, 멤버 ID
   * @returns {Promise} - .
   */
  refuseClubMember: async (clubId, config) => {
    try {
      const response = await users.refuseClubMember(clubId, config);
      return response.data;
    } catch (error) {
      console.error("Error in refuseClubMember:", error);
      throw error;
    }
  },

  /**
   * 사용자 추방
   * @param {string} clubId - PathVariable: 클럽 ID
   * @param {Object} config - Request header: 클럽 리더 ID, 멤버 ID
   * @returns {Promise} - .
   */
  fireClubMember: async (clubId, config) => {
    try {
      const response = await users.fireClubMember(clubId, config);
      return response.data;
    } catch (error) {
      console.error("Error in fireClubMember:", error);
      throw error;
    }
  },

  achieveTarget: async (clubTransitRequest) => {
    try {
      const response = await users.achieveTarget(clubTransitRequest);
      return response.data;
    } catch (error) {
      console.error("Error in achieveTarget:", error);
      throw error;
    }
  },

  /**
   * 사용자 기본 정보 조회
   * @returns {Promise} - A Promise that resolves to the user's basic information.
   */
  getMyUserInfo: async () => {
    try {
      const response = await users.getMyUserInfo();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error in getMyUserInfo:", error);
      throw error;
    }
  },

  /**
   * 개인 정보 수정
   * @param {Object} form - Request body: 수정할 개인 정보 데이터
   * @returns {Promise} - .
   */
  updateUserInfo: async (form) => {
    try {
      const response = await users.updateUserInfo(form);
      return response.data;
    } catch (error) {
      console.error("Error in updateUserInfo:", error);
      throw error;
    }
  },

  /**
   * 비밀번호 수정
   * @param {Object} ModifyPasswordRequest - Request body: 수정할 비밀번호 데이터
   * @param {Object} config - Request header: 헤더 설정
   * @returns {Promise} - .
   */
  updatePassword: async (ModifyPasswordRequest, config) => {
    try {
      const response = await users.updatePassword(
        ModifyPasswordRequest,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error in updatePassword:", error);
      throw error;
    }
  },

  /**
   * 카카오 콜백
   * @param {string} code - Query parameter: 인가 코드
   * @returns {Promise} - .
   */
  kakaoCallBack: async (code) => {
    try {
      const response = await users.kakaoCallBack(code);
      return response.data;
    } catch (error) {
      console.error("Error in kakaoCallBack:", error);
      throw error;
    }
  },

  /**
   * 카카오 회원가입
   * @param {Object} userInfoRequest - Request body: 카카오 회원가입 데이터
   * @param {String} config - Request header: 헤더 설정 (토큰)
   * @returns {Promise} - .
   */
  joinKakao: async (userInfoRequest, config) => {
    try {
      const response = await users.joinKakao(userInfoRequest, config);
      return response.data;
    } catch (error) {
      console.error("Error in joinKakao:", error);
      throw error;
    }
  },
};

export default UserService;
