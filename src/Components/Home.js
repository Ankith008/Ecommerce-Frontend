import React, { useContext } from "react";
import "../css/Home.css";
import CreateContext from "../Context/CreateContext";
import { Link } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";

export default function Home() {
  const {
    showloginoption,
    setshowloginoption,
    setloginoptions,
    setAuth,
    findorders,
  } = useContext(CreateContext);
  const refresh = useRefreshToken(setAuth);

  return (
    <div className="container">
      <main>
        {showloginoption && (
          <section className="options">
            <div className="showoptions">
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p onClick={() => setloginoptions("User_Login")}>
                    User Login
                  </p>
                </Link>
              </p>
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p
                    onClick={() => {
                      setloginoptions("User_signup");
                    }}
                  >
                    User Signup
                  </p>
                </Link>
              </p>
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p onClick={() => setloginoptions("Company_Signup")}>
                    Company Signup
                  </p>
                </Link>
              </p>
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p onClick={() => setloginoptions("Company_Login")}>
                    Company Login
                  </p>
                </Link>
              </p>
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p onClick={() => setloginoptions("Delivery_Signup")}>
                    Delivery gay Signup
                  </p>
                </Link>
              </p>
              <p onClick={() => setshowloginoption(false)}>
                <Link to="/sign">
                  <p onClick={() => setloginoptions("Delivery_Login")}>
                    Delivery gay Login
                  </p>
                </Link>
              </p>
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
            <a href="/" className="shopnow">
              Shop Now →
            </a>
          </div>
        </section>
        <section className="followed"></section>
        <button onClick={() => refresh()}>refresh</button>
        <button onClick={findorders}>find</button>
      </main>
    </div>
  );
}
