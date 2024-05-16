import React from "react";
import orderplaced from "../images/orderplaced.jpg";

export default function OrderPlaced() {
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
        src={orderplaced}
        style={{
          width: (window.innerWidth * 50) / 100,
        }}
        alt="orderplaced"
        className="404img"
      />
    </div>
  );
}
