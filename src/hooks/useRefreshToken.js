import { useContext } from "react";
import axios from "../api/axios";
import { settingAuth } from "../actions";
import { useDispatch } from "react-redux";
import CreateContext from "../Context/CreateContext";
const useRefreshToken = () => {
  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);
  try {
    const dispatch = useDispatch();
    const refresh = async () => {
      const response = await axios.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      dispatch(settingAuth(response.data.accessToken));
      localStorage.setItem("authorized", true);
      return response.data.accessToken;
    };
    return refresh;
  } catch (error) {
    setalertdesc("Please Try Login ");
    setalerthead("Error");
    setshowalert(true);
    localStorage.setItem("authorized", false);
  }
};
export default useRefreshToken;
