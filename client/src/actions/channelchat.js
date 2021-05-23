import axios from "../utils/axios";
 
export function getChannelChats(channelId, credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/get/channelchats/${channelId}`, credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function readChannelChats(chatId, userId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`channelchat/read/${chatId}/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
