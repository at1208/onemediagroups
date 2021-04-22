import axios from "../utils/axios";

export function getDomains() {
  return new Promise((resolve, reject) => {
    axios
      .get("/domains")
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
