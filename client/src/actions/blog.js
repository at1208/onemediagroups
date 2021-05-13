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

export function filterBlog(credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/blog/filter`, credentials, {
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

export function singleBlog(id, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/blog/single/${id}`,{
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


export function reviewUpdate(blogId, credentials, token) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`/blog/review/update/${blogId}`, credentials, {
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
