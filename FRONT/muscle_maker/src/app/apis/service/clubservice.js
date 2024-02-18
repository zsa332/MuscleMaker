import { clubs } from "../api/clubapi";

const clubservice = {
  /**
   *
   * @param {*} clubId (Pathvariable)
   * @returns
   */
  getClubInfo: async (clubId) => {
    try {
      const clubInfo = await clubs.getClubInfo(clubId);
      return clubInfo.data;
    } catch (error) {
      console.error("Error in getClubInfo:", error);
      throw error;
    }
  },


  searchClub : async (keyword) =>{
    try{
      const response = await clubs.searchclub(keyword);
      console.log(response);
      return response.data;
    } catch(error){
      console.error("error in searchClub ", error);
      throw error;
    }
  },

  /**
   *
   * @param {*} clubId (PathVariable)
   * @returns
   */
  getClubMembers: async (clubId) => {
    try {
      const clubMembers = await clubs.getClubMembers(clubId);
      return clubMembers.data;
    } catch (error) {
      console.error("error : ", error);
      throw error;
    }
  },

  /**
   *
   * @param {*} userId  (PathVariable)
   * @param {*} clubRegistRequest  (DTO)
   * @returns
   */
  writeClub: async (userId, clubRegistRequest) => {
    try {
      const result = await clubs.writeClub(userId, clubRegistRequest);
      return result.data;
    } catch (error) {
      console.error("error : ", error);
      throw error;
    }
  },

  updateClub: async (userId, clubRegistRequest) => {
    try {
      const result = await clubs.updateClub(userId, clubRegistRequest);
      return result.data;
    } catch (error) {
      console.error("error : ", error);
      throw error;
    }
  },

  getClubCalendar: async (clubId, month) => {
    try {
      const calendarInfo = await clubs.getClubCalendar(clubId, month);
      return calendarInfo.data;
    } catch (error) {
      console.error("error : ", error);
      throw error;
    }
  },

  getRecommendationClubs: async (userId, sorting) => {
    try {
      const response = await clubs.getRecommendationClubs(userId, sorting);
      return response.data;
    } catch (error) {
      console.error("error : ", error);
      throw error;
    }
  },
};

export default clubservice;
