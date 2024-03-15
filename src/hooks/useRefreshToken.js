import { useContext } from "react";
import axios from "../api/axios";
import { settingAuth } from "../actions";
import { useDispatch } from "react-redux";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    dispatch(settingAuth(response.data.accessToken));
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
