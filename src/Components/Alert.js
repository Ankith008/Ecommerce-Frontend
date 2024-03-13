import React from "react";
import "../css/Alert.css";
import { useContext } from "react";
import CreateContext from "../Context/CreateContext";

export default function Alert() {
  const { alerthead, alertdesc, showalert } = useContext(CreateContext);
  return (
    <div>
      {showalert && (
        <div div className="alert">
          <div className="alerthead">{alerthead}</div>
          <div className="alertdesc">{alertdesc}</div>
        </div>
      )}
    </div>
  );
}
