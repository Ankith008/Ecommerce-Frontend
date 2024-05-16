import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import logo from "../images/logo2.png";
import bar from "../images/bar.png";
import cross from "../images/cross.png";
import CreateContext from "../Context/CreateContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { settingAuth } from "../actions";

export default function Navbar() {
  const keys = ["storeid", "productid", "type", "signup", "stores"];
  const dispatch = useDispatch();
  const {
    setshowloginoption,
    shownav,
    setalerthead,
    setalertdesc,
    setshowalert,
  } = useContext(CreateContext);
  const [showhum, setshowhum] = useState(true);
  const navigate = useNavigate();

  const companyclick = async () => {
    const getauth = await localStorage.getItem("authorized");
    if (getauth === "true") {
      navigate("/profile");
    } else {
      await localStorage.setItem("signup", "Company_Signup");
      navigate("/sign");
    }
  };

  const handlelogout = async () => {
    try {
      const response = await axios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        dispatch(settingAuth(""));
        setalertdesc("You have been logged out successfully");
        setalerthead("Success");
        setshowalert(true);
        localStorage.setItem("authorized", false);
        keys.map((key) => localStorage.removeItem(key));
        navigate("/");
      }
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Error logging out, Please Try Again");
      setshowalert(true);
      localStorage.setItem("authorized", true);
    }
  };

  return (
    <div>
      {shownav && (
        <nav className="larger">
          <p className="logo" onClick={() => navigate("/")}>
            <img
              className="logoimg"
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
            />
            Kutta
          </p>

          <ul className="middle">
            <li
              onClick={() => {
                setshowhum(!showhum);
                navigate("/");
              }}
            >
              Home
            </li>
            <li onClick={() => navigate("/shop")}>Shop</li>
            <li onClick={companyclick}>Company</li>
            <li>Delivery</li>
            <li>Update</li>
            <li>Orders</li>
            <li>Your Carts</li>
          </ul>
          <ul className="last">
            <li
              onClick={() => {
                setshowloginoption(true);
                navigate("/");
              }}
            >
              Sign Up
            </li>
            <li onClick={() => handlelogout()}>Logout</li>
          </ul>
        </nav>
      )}
      {!showhum && (
        <nav className="smaller">
          <ul className="middle">
            <li
              onClick={() => {
                setshowhum(!showhum);
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                setshowhum(!showhum);
                navigate("/shop");
              }}
            >
              Shop
            </li>
            <li
              onClick={() => {
                setshowhum(!showhum);
                navigate("/profile");
              }}
            >
              Company
            </li>
            <li onClick={() => setshowhum(!showhum)}>Delivery</li>
            <li onClick={() => setshowhum(!showhum)}>Orders</li>
            <li onClick={() => setshowhum(!showhum)}>Update</li>
            <li onClick={() => setshowhum(!showhum)}>About Us</li>
            <li onClick={() => setshowhum(!showhum)}>Your Carts</li>
            <li
              onClick={() => {
                setshowhum(!showhum);
                setshowloginoption(true);
                navigate("/");
              }}
            >
              Sign Up
            </li>

            <li
              onClick={() => {
                setshowhum(!showhum);
                handlelogout();
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      )}
      {shownav && (
        <div className="humimage">
          {showhum ? (
            <img
              className="hum"
              src={bar}
              onClick={() => setshowhum(!showhum)}
              alt="bar"
            />
          ) : (
            <img
              className="hum"
              src={cross}
              onClick={() => setshowhum(!showhum)}
              alt="cross"
            />
          )}
        </div>
      )}
    </div>
  );
}
