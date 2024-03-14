import { useContext } from "react";
import axios from "../api/axios";
import CreateContext from "../Context/CreateContext";
const useRefreshToken = () => {
  const { setAuth } = useContext(CreateContext);
  const refresh = async () => {
    const response = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
