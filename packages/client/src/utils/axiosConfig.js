import axios from "axios";

const baseURL = "http://localhost:5000/api/";

export const setAxios = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = false;
  axios.defaults.headers["Accept"] = "application/ld+json";
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

  // axios.interceptors.request.use(function (config) {
  //   if (config.method === "post") {
  //     try {
  //       const body = config.data;
  //       const obj: Partial<typeof body> = {};
  //       for (const key in body) {
  //         if (body[key] !== null && body[key] !== undefined) {
  //           obj[key] = body[key];
  //         }
  //       }
  //       config.data = obj;
  //     } catch (err) {
  //       return config;
  //     }
  //   }

  //   return config;
  // });

  // axios.interceptors.response.use(
  //   function (error) {
  //     // response error
  //     if (
  //       error?.response?.status === 401 &&
  //       !window.location.pathname.includes("login") &&
  //       !window.location.pathname.includes("account/params") &&
  //       !window.location.pathname.includes("sign-up")
  //     ) {
  //       deleteCookie();
  //       removeAxiosContext();
  //       // setAxiosAuthHeaderToken("");
  //       console.log("Disconnected");

  //       sessionStorage.setItem("disconnected-path", window.location.pathname);

  //       // alert disconnected

  //       sessionStorage.setItem("disconnected", "401");
  //       store.dispatch(logout());
  //     }
  //     // console.log("Intercepted error", error);
  //     return Promise.reject(error?.response ?? error); // transform response.response -> response
  //   }
  // );
};
