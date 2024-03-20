import React, { useContext } from "react";
import "../css/Loader.css";
import CreateContext from "../Context/CreateContext";

export default function Loader() {
  const { loading } = useContext(CreateContext);
  return (
    <div>
      {loading && (
        <div className="overlay-loader">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
