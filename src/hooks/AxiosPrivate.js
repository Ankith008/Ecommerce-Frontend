import axiosPrivate from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const UseAxiosPrivate = (auth, setAuth) => {
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
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
            if (setAuth) {
              setAuth({ accessToken: newAccessToken });
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
  }, [auth, refresh, setAuth]);

  return axiosPrivate;
};

export default UseAxiosPrivate;
