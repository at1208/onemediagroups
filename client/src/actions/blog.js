import axios from "../utils/axios";
import cookie from 'js-cookie';

export function createBlog(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/blog`, credentials, {
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
            }
        })
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
