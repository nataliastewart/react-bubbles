import axios from "axios";

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axios.create({
    baseUrl: "http://localhost:5000",
    headers: {
      Authorization: token,
    },
  });
};
