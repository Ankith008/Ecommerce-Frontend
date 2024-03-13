import { useContext } from "react";
import CreateContext from "../Context/CreateContext";

const UseAuth = () => {
  return useContext(CreateContext);
};

export default UseAuth;
