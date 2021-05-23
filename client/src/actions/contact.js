import axios from "../utils/axios";


export function getContacts(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/employee/contact-number/contact/read`, credentials)
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
