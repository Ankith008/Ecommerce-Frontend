import React, { useEffect, useState, useContext } from "react";
import "../css/NotCard.css";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/axios";
import CreateContext from "../Context/CreateContext";

export default function NotCard(props) {
  const navigate = useNavigate();
  const localtype = localStorage.getItem("type");
  const { setalertdesc, setalerthead, setshowalert } =
    useContext(CreateContext);

  const handleviewproduct = () => {
    if (props.productid) {
      localStorage.setItem("productid", props.productid);
      navigate("/productprofile");
    }
  };

  const storeid = localStorage.getItem("storeid");

  const handlestatusclick = async (noteid, status) => {
    if (localtype && localtype === "store") {
      const response = await axiosPrivate.post(
        "/find/status",
        { storeid: storeid, noteid: noteid, status: status },
        {
          withCredentials: true,
        }
      );
      const json = await response.data;
      if (json.success) {
        setalerthead("Success");
        setalertdesc("Status Updated Successfully Please Refresh Page");
        setshowalert(true);
      } else {
        setalerthead("Error");
        setalertdesc(json.error || "Internal Server Issue");
        setshowalert(true);
      }
    }
  };

  return (
    <div className="Notcardouter">
      <div className="customer">
        <h4>Customer : </h4>
        <div className="customerName">
          <span className="what">Customer Name : </span>
          <span className="ans">{props.name}</span>
        </div>
        <div className="customerAddress">
          <span className="what">Customer Address : </span>
          <span className="ans">{props.address}</span>
        </div>
        <div className="customerPhone">
          <span className="what">Customer Phone : </span>
          <span className="ans">{props.phone}</span>
        </div>
      </div>
      <div className="products">
        <h4>Products : </h4>
        <div className="product">
          <div className="productname">
            <span className="what">Product Name : </span>
            <span className="ans">{props.productname}</span>
          </div>
          <div className="productquantity">
            <span className="what">Product Quantity : </span>
            <span className="ans">{props.productquantity}</span>
          </div>
          <div className="productsize">
            <span className="what">Product Size : </span>
            <span className="ans">{props.productsize}</span>
          </div>
          <div className="productprice">
            <span className="what">Order Price : </span>
            <span className="ans">{props.productprice}</span>
          </div>

          <button
            className="viewproduct"
            onClick={() => {
              handleviewproduct(props.productid);
            }}
          >
            View Product
          </button>
        </div>
      </div>
      <div className="Status">
        <h4>Status : </h4>
        <div className="butto">
          <div className="button1">
            <button
              className="pending"
              style={{
                backgroundColor:
                  props.status === "Pending" ? "black" : "transparent",
                color: props.status === "Pending" ? "white" : "black",
              }}
              onClick={() => {
                handlestatusclick(`${props.unique}`, "Pending");
              }}
            >
              Pending
            </button>
            <button
              className="shipped"
              style={{
                backgroundColor:
                  props.status === "Shipped" ? "black" : "transparent",
                color: props.status === "Shipped" ? "white" : "black",
              }}
              onClick={() => {
                handlestatusclick(`${props.unique}`, "Shipped");
              }}
            >
              Shipped
            </button>
          </div>
          <div className="button2">
            <button
              className="out"
              style={{
                backgroundColor:
                  props.status === "Out for Delivery" ? "black" : "transparent",
                color: props.status === "Out for Delivery" ? "white" : "black",
              }}
              onClick={async () => {
                handlestatusclick(`${props.unique}`, "Out for Delivery");
              }}
            >
              Out for Delivery
            </button>
            <button
              className="deliver"
              style={{
                backgroundColor:
                  props.status === "Delivered" ? "black" : "transparent",
                color: props.status === "Delivered" ? "white" : "black",
              }}
              onClick={async () => {
                handlestatusclick(`${props.unique}`, "Delivered");
              }}
            >
              Delivered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
