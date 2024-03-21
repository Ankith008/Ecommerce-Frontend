import React from "react";
import "../css/Card.css";

export default function Card(props) {
  return (
    <div className="cardouter">
      <div className="image">
        <img
          className="image1"
          src={
            props.image
              ? props.image
              : "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt=""
        />
      </div>
      <div className="content">
        <div className="name detail">
          <p className="head">Name:</p>
          <p className="dec">{props.name}</p>
        </div>
        <div className="incharge detail">
          <p className="head">Incharge:</p>
          <p className="dec">{props.incharge}</p>
        </div>
        <div className="branch detail">
          <p className="head">Branch:</p>
          <p className="dec">{props.branch}</p>
        </div>
        <div className="number detail">
          <p className="head">Number:</p>
          <p className="dec">{props.number}</p>
        </div>
        <div className="email detail">
          <p className="head">Email:</p>
          <p className="dec">{props.email.substring(0, 12) + "..."}</p>
        </div>
      </div>
    </div>
  );
}
