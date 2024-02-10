import apiInstance from "../utils/axios";
const axios = apiInstance();

export const notificationAPI = {
  getNotification : (userId) => axios.get(`notification/${userId}`),
  readNotification : (notificationId) => axios.get(`notification/read/${notificationId}`)
}