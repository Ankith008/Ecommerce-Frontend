import { useEffect, useState } from "react";
import CreateContext from "./CreateContext";
import Alert from "../Components/Alert";
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
  const [loading, setloading] = useState(false);

  const findorders = async () => {
    try {
      setloading(true);
      const response = await axiosPrivate.post("auth/order");
      console.log("response", response.data);
      setloading(false);
    } catch (error) {
      // setalerthead("Error");
      // setalertdesc("Please Try Login Again");
      // setshowalert(true);
      console.error("Error finding orders:", error);
      setloading(false);
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
        loading,
        setloading,
      }}
    >
      {props.children}
    </CreateContext.Provider>
  );
};
export default ContextState;
