import React, { useEffect, useRef } from "react";
import "../css/Alert.css";
import { useContext } from "react";
import CreateContext from "../Context/CreateContext";

export default function Alert() {
  const { alerthead, alertdesc, showalert, setshowalert } =
    useContext(CreateContext);
  useEffect(() => {
    if (showalert) {
      setTimeout(() => {
        alertRef.current.style.top = "-50%";
        setTimeout(() => {
          setshowalert(false);
        }, 2000);
      }, 3000);
    }
  }, [showalert]);
  const alertRef = useRef(null);
  return (
    <div className="parent">
      {showalert && (
        <div div className="alert" ref={alertRef}>
          <div className="alerthead">{alerthead}</div>
          <div className="alertdesc">{alertdesc}</div>
        </div>
      )}
    </div>
  );
}
