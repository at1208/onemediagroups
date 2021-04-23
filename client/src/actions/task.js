import axios from "../utils/axios";

export function createTask(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/create/task", credentials)
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

export function taskCountByProject(project_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`task/count/${project_id}`)
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
