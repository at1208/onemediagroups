import axios from "../utils/axios";
// import cookie from 'js-cookie';

export function createDepartment(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/department", credentials)
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

export function getDepartments() {
  return new Promise((resolve, reject) => {
    axios
      .get("/all/department")
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
