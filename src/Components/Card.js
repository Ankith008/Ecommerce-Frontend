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
  const localtype = localStorage.getItem("type");

  let cat = "";
  if (props.category) {
    let categorie = props.category.join(",");
    if (categorie.length >= 5) {
      cat = categorie.substring(0, 15) + "...";
    } else {
      cat = categorie;
    }
  }

  const fetchData = async () => {
    setloading(true);
    if (localtype === "store") {
      const response = await axios.get(
        `/find/store/${!localstoreid ? mystate : localstoreid}`
      );
      if (response.data) {
        dispatch(settingstoredetail(response.data.store));
        localStorage.setItem("stores", JSON.stringify(response.data.store));
        navigate("/storeprofile");
      }
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

  const handleproduct = async () => {
    const element = cardRef.current;
    if (element) {
      localStorage.setItem("productid", props.unique);
      navigate("/productprofile");
    }
  };

  return (
    <>
      {localtype === "store" ? (
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
              alt="Profile"
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
                <p className="dec">{props.email?.slice(0, 23) + "..."}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="cardouter"
          ref={cardRef}
          onClick={async () => {
            await handleproduct();
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
              alt="Profile"
            />
          </div>
          <div className="content">
            <div className="companycontent">
              <div className="name detail">
                <p className="head">Name:</p>
                <p className="dec">{props.name}</p>
              </div>
              <div className="prize detail">
                <p className="head">Branch:</p>
                <p className="dec">{props.price}</p>
              </div>
              <div className="size detail">
                <p className="head">Size:</p>
                <p className="dec">{props.size}</p>
              </div>
              <div className="email detail">
                <p className="head">Category:</p>
                <p className="dec">{cat}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
