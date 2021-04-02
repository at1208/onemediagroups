import openSocket from 'socket.io-client';
import { getCookie } from '../actions/auth';
const token = getCookie("token");
let socket = openSocket('http://localhost:8000',{
  reconnectionDelayMax: 10000,
  auth: {
    token: token
  }
})
export default socket;
