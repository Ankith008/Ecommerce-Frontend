import axiosPrivate from "../api/axios";
import { useContext, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import CreateContext from "../Context/CreateContext";
const UseAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useContext(CreateContext);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"] && auth && auth.accessToken) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error.response &&
          error?.response?.status === 403 &&
          !prevRequest._retry
        ) {
          prevRequest._retry = true;
          try {
            const newAccessToken = await refresh();
            if (setAuth) {
              setAuth({ accessToken: newAccessToken });
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            }
            return axiosPrivate(prevRequest);
          } catch (error) {
            console.error("Error refreshing token:", error);
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]);

  return axiosPrivate;
};

export default UseAxiosPrivate;
