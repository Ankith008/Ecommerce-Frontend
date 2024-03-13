import { useEffect, useState } from "react";
import CreateContext from "./CreateContext";
// import Alert from "../Components/Alert";
import useaxiosPrivate from "../hooks/AxiosPrivate";

const ContextState = (props) => {
  const [showloginoption, setshowloginoption] = useState(false);
  const [shownav, setshownav] = useState(true);
  const [loginoptions, setloginoptions] = useState("");
  const [alerthead, setalerthead] = useState("");
  const [alertdesc, setalertdesc] = useState("");
  const [showalert, setshowalert] = useState(false);
  const [auth, setAuth] = useState("");
  const axiosPrivate = useaxiosPrivate(auth, setAuth);
  useEffect(() => {
    console.log("authseted", auth);
  }, [auth]);

  const findorders = async () => {
    try {
      const response = await axiosPrivate.post("auth/order");
      console.log("response", response.data);
    } catch (error) {
      console.error("Error finding orders:", error);
    }
  };

  return (
    <CreateContext.Provider
      value={{
        shownav,
        setshownav,
        setshowloginoption,
        showloginoption,
        loginoptions,
        setloginoptions,
        alerthead,
        setalerthead,
        alertdesc,
        setalertdesc,
        showalert,
        setshowalert,
        findorders,
        auth,
        setAuth,
      }}
    >
      {props.children}
    </CreateContext.Provider>
  );
};
export default ContextState;
