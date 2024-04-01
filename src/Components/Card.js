import React, { useContext, useEffect, useRef } from "react";
import "../css/Card.css";
import { useDispatch, useSelector } from "react-redux";
import { settingstoreid } from "../actions/index";
import axios from "../api/axios";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";
import { settingstoredetail } from "../actions/index";

export default function Card(props) {
  const mystate = useSelector((state) => state.settingstoreid);
  const localstoreid = localStorage.getItem("storeid");
  const { setloading } = useContext(CreateContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    setloading(true);
    const response = await axios.get(
      `/find/store/${!localstoreid ? mystate : localstoreid}`
    );
    if (response.data) {
      dispatch(settingstoredetail(response.data.store));
      navigate("/storeprofile");
    }
    setloading(false);
  };

  const cardRef = useRef();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const element = cardRef.current;
    if (element) {
      dispatch(settingstoreid(props.unique));
      localStorage.setItem("storeid", props.unique);
      fetchData();
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
