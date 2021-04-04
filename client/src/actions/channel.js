import axios from "../utils/axios";
// import cookie from 'js-cookie';

export function createChannel(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/channel", credentials)
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


export function getChannels(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/get/channels/${credentials}`)
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
