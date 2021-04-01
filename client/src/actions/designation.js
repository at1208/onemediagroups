import axios from "../utils/axios";
// import cookie from 'js-cookie';

export function createDesignation(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/designation", credentials)
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

export function getDesignations() {
  return new Promise((resolve, reject) => {
    axios
      .get("/all/designation")
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
