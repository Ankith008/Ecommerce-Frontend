import React, { useEffect, useRef } from "react";
import "../css/Card.css";
import { useDispatch, useSelector } from "react-redux";
import { settingstoreid } from "../actions/index";
import axiosPrivate from "../api/axios";

export default function Card(props) {
  const mystate = useSelector((state) => state.settingstoreid);

  const fetchData = async () => {
    if (mystate) {
      try {
        const response = await axiosPrivate.get(`/find/store/${mystate}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error finding store:", error);
      }
    }
  };

  const cardRef = useRef();
  const dispatch = useDispatch();

  const handleClick = () => {
    const element = cardRef.current;
    if (element) {
      dispatch(settingstoreid(props.unique));
    }
  };
  return (
    <div
      className="cardouter"
      ref={cardRef}
      onClick={async () => {
        await handleClick();
        await fetchData();
      }}
    >
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
        <div className="companycontent">
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
    </div>
  );
}
