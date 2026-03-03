import axios from "axios";

const http = axios.create({
  baseURL: "https://volunteers-1.onrender.com",

  headers: {
    "Content-type": "application/json",
  },
});
export default http;
