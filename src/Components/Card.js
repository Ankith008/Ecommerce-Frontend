import React, { useEffect, useRef, useState } from "react";
import "../css/Card.css";
import { useDispatch, useSelector } from "react-redux";
import { settingstoreid } from "../actions/index";
import axiosPrivate from "../api/axios";

export default function Card(props) {
  const mystate = useSelector((state) => state.settingstoreid);
  const localstoreid = localStorage.getItem("storeid");
  const isMounted = useRef(false);

  const fetchData = async () => {
    const response = await axiosPrivate.get(
      `/find/store/${!localstoreid ? mystate : localstoreid}`
    );
    console.log(response.data);
  };
  useEffect(() => {
    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, []);

  const cardRef = useRef();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const element = cardRef.current;
    if (element) {
      dispatch(settingstoreid(props.unique));
      localStorage.setItem("storeid", props.unique);
      if (!isMounted.current) {
        fetchData();
      }
    }
  };
  return (
    <div
      className="cardouter"
      ref={cardRef}
      onClick={async () => {
        await handleClick();
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
