import axios from "../utils/axios";

export function getCategories() {
  return new Promise((resolve, reject) => {
    axios
      .get("/categories")
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
