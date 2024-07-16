import React, { useContext, useEffect } from "react";
import "../css/Home.css";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import axios from "../api/axios";
import { settingAuth } from "../actions/index";
import { useDispatch } from "react-redux";
import cross from "../images/remove.png";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    showloginoption,
    setshowloginoption,
    setloginoptions,
    setalerthead,
    setalertdesc,
    setshowalert,
  } = useContext(CreateContext);

  disableReactDevTools();

  useEffect(() => {
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
          setalertdesc("Please Get Authenticated Again");
          setshowalert(true);
          localStorage.setItem("authorized", false);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="container">
      <main>
        {showloginoption && (
          <section className="options">
            <div className="showoptions">
              <img
                src={cross}
                alt="cross"
                className="crossback"
                onClick={() => setshowloginoption(false)}
              />
              <div className="showoptions1">
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("User_Login");
                    localStorage.setItem("signup", "User_Login");
                    navigate("/sign");
                  }}
                >
                  User Login
                </p>
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("User_signup");
                    localStorage.setItem("signup", "User_signup");
                    navigate("/sign");
                  }}
                >
                  User Signup
                </p>
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("Company_Signup");
                    localStorage.setItem("signup", "Company_Signup");
                    navigate("/sign");
                  }}
                >
                  Company Signup
                </p>
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("Company_Login");
                    localStorage.setItem("signup", "Company_Login");
                    navigate("/sign");
                  }}
                >
                  Company Login
                </p>
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("Delivery_Signup");
                    localStorage.setItem("signup", "Delivery_Signup");
                    navigate("/sign");
                  }}
                >
                  Delivery Boy Signup
                </p>
                <p
                  onClick={async () => {
                    setshowloginoption(false);
                    await setloginoptions("Delivery_Login");
                    localStorage.setItem("signup", "Delivery_Login");
                    navigate("/sign");
                  }}
                >
                  Delivery Boy Login
                </p>
              </div>
            </div>
          </section>
        )}
        <section className="main-page">
          <div className="details">
            <h1 className="Logo">Welcome To Kutta</h1>
            <p className="des">
              Discover the ultimate destination for fashion aficionados. Unveil
              curated collections that redefine style. Elevate your wardrobe
              with our exclusive designs. Experience seamless shopping with
              secure transactions. Join our community of trendsetters today and
              step into a world of endless fashion possibilities.
            </p>
            <p className="shopnow" onClick={() => navigate("/shop")}>
              Shop Now →
            </p>
          </div>
        </section>
        <section className="followed"></section>
      </main>
    </div>
  );
}
