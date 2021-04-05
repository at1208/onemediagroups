import axios from "../utils/axios";

export function createProject(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/project", credentials)
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


export function getProjects() {
  return new Promise((resolve, reject) => {
    axios
      .get("/all/project")
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
