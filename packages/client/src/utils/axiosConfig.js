import axios from "axios";
import store from "../store";
import { logout } from "../features/auth/authSlice";

const baseURL = "http://localhost:5000/api/";

export const setAxios = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = false;
  axios.defaults.headers["Accept"] = "application/ld+json";
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

  axios.interceptors.response.use(
    (response) => {
      // If the response is successful, simply return it
      return response;
    },
    (error) => {
      // Check if the error is a 401 Unauthorized
      if (error.response && error.response.status === 401) {
        // Dispatch the logout action
        store.dispatch(logout());
      }

      // Reject the error so it can be handled by the component
      return Promise.reject(error);
    }
  );
};
