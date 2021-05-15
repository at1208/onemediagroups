import axios from "../utils/axios";

export function getDashboardInfo(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/dashboard/info`)
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
