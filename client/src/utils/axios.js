import axios from "axios";

export default axios.create({
  baseURL:"http://localhost:8000/api",
  validateStatus: (status) => status < 500,
});
