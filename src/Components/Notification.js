import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/Notification.css";
import search from "../images/search.png";
import NotCard from "./NotCard";
import axiosPrivate from "../api/axios";
import axios from "../api/axios";
import { settingAuth } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import CreateContext from "../Context/CreateContext";

export default function Notification() {
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state.setting);
  const { setalertdesc, setalerthead, setshowalert } =
    useContext(CreateContext);
  const [shownotifoption, setshownotifoption] = useState(false);
  const noticon = useRef(null);
  const [status, setstatus] = useState("");
  const [temporders, settemporders] = useState([]);
  const [orders, setorders] = useState([]);

  const findingorders = async () => {
    if (localStorage.getItem("signup") !== "Company_Login") {
      const response = await axiosPrivate.get("/find/findorders", {});
      const json = await response.data;
      setorders(json.orders);
      settemporders(json.orders);
    }
  };

  const findstoreorders = async () => {
    try {
      const id = localStorage.getItem("storeid");
      const response = await axiosPrivate.get(
        `/find/findstoreorders/${id}`,
        {}
      );
      const json = await response.data;
      setorders(json.orders);
      settemporders(json.orders);
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Please Try Login");
      setshowalert(true);
    }
  };

  async function handleeffect() {
    if (localStorage.getItem("authorized") === "true") {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );
          dispatch(settingAuth(response.data.accessToken));
          localStorage.setItem("authorized", true);
        } catch (error) {
          setalerthead("Error");
          setalertdesc("Please Try Login");
          setshowalert(true);
          localStorage.setItem("authorized", true);
        }
      };
      await fetchData();
      if (localStorage.getItem("signup") !== "Company_Login") {
        findingorders();
      } else {
        findstoreorders();
      }
    }
  }

  useEffect(() => {
    handleeffect();
  }, []);

  const handlenoticlick = () => {
    const notielement = noticon.current;
    if (notielement) {
      setshownotifoption(!shownotifoption);
    }
  };

  const handlefindnote = async (status) => {
    const neworders = [];
    await temporders.map((ele) => {
      if (ele.status === status) {
        neworders.push(ele);
      }
    });
    setorders(neworders);
  };

  const handlesearchkeydonw = async (e) => {
    if (e.key === "Enter") {
      const values = parseInt(document.getElementById("search").value);
      const neworders = [];
      await temporders.map((ele) => {
        if (ele.phone === values) {
          neworders.push(ele);
        }
      });
      setorders(neworders);
      handlenoticlick();
    }
  };

  useEffect(() => {
    console.log(temporders);
  }, [temporders]);

  return (
    <div className="notificationouter">
      <h2>Orders</h2>
      <img
        src={search}
        alt="search"
        className="notisearchicon"
        ref={noticon}
        onClick={handlenoticlick}
      />
      {shownotifoption && (
        <div className="searchop">
          <input
            type="search"
            name="searchphone"
            id="search"
            placeholder="Search by Phone number"
            onKeyDown={handlesearchkeydonw}
          />
          <div className="option">
            <div
              className="btn btn-anim otptions pending "
              onClick={async () => {
                setstatus("Pending");
                await handlefindnote("Pending");
                handlenoticlick();
              }}
            >
              Pending
            </div>
            <div
              className="btn btn-anim otptions shipped"
              onClick={async () => {
                setstatus("Shipped");
                await handlefindnote("Shipped");
                handlenoticlick();
              }}
            >
              Shippend
            </div>
            <div
              className="btn btn-anim otptions outfordeliverd"
              onClick={async () => {
                setstatus("Out for Delivery");
                await handlefindnote("Out for Delivery");
                handlenoticlick();
              }}
            >
              Out For Delivery
            </div>
            <div
              className="btn btn-anim otptions delivered"
              onClick={async () => {
                setstatus("Delivered");
                await handlefindnote("Delivered");
                handlenoticlick();
              }}
            >
              Delivered
            </div>
          </div>
        </div>
      )}
      <div className="notificationresult">
        {orders?.length > 0 ? (
          orders.map((ele) => (
            <NotCard
              key={ele._id}
              unique={ele._id}
              name={ele.name}
              address={ele.address}
              phone={ele.phone}
              productid={ele.productid}
              productname={ele.productname}
              productprice={ele.productprice}
              productsize={ele.productsize}
              status={ele.status}
              payment={ele.payment}
              productquantity={ele.productquantity}
            />
          ))
        ) : (
          <h1>No Orders Found</h1>
        )}
      </div>
    </div>
  );
}
