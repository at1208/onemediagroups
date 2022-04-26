import axios from "../utils/axios";

export function getSalaryStructure(token) {
  return new Promise((resolve, reject) => {
    axios
      .get("/get/salaryStructure", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
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
