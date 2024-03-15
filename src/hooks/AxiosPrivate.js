import axiosPrivate from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector, useDispatch } from "react-redux";
import { settingAuth } from "../actions";

const UseAxiosPrivate = (auth) => {
  const mystate = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${mystate}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest._retry) {
          prevRequest._retry = true;
          try {
            const newAccessToken = await refresh();
            if (mystate) {
              dispatch(settingAuth(newAccessToken));
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            }
          } catch (error) {
            console.error("Error refreshing token:", error);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh, mystate, dispatch]);

  return axiosPrivate;
};

export default UseAxiosPrivate;
