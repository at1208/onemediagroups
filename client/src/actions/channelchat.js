import axios from "../utils/axios";
// import cookie from 'js-cookie';

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
