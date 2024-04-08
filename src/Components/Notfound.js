import React from "react";
import notfound from "../images/pngwing.com.png";

export default function Notfound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "2rem",
      }}
      className="Notout"
    >
      <img
        className="404img"
        style={{
          width: (window.innerWidth * 50) / 100,
        }}
        src={notfound}
        alt="Not Found"
      />
    </div>
  );
}
