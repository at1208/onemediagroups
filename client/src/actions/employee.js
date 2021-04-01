import axios from "../utils/axios";
import cookie from 'js-cookie';

export function createEmployee(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/employee", credentials)
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
