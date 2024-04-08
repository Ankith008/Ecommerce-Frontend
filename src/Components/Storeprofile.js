import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateContext from "../Context/CreateContext";
import { settingstoredetail } from "../actions/index";
import "../css/StoreProfile.css";

export default function Storeprofile() {
  const { setshownav } = useContext(CreateContext);
  const dispatch = useDispatch();
  let stores = localStorage.getItem("stores");
  stores = JSON.parse(stores);
  const mystate = useSelector((state) => state.settingstoredetail);

  useEffect(() => {
    if (stores) {
      dispatch(settingstoredetail(stores));
    }
    setshownav(true);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="profileouter">
      <h2>Store</h2>
      <section className="desc">
        <div className="left">
          <img
            src={
              mystate
                ? mystate.profile
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="right">
          <div className="companydetails">
            <p>
              <span>Store Name:</span> {mystate && mystate.storename}
            </p>
            <p>
              <span>Store Owner:</span>
              {mystate && mystate.storeIncharegename}
            </p>
            <p>
              <span>Store Email:</span>
              {mystate && mystate.storeemail}
            </p>
            <p>
              <span>Store Location:</span>
              {mystate && mystate.storeAddress}
            </p>
            <p>
              <span>Store Contact:</span>
              {mystate && mystate.storeIncharegenumber}
            </p>
          </div>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#413F3D"
          fillOpacity="1"
          d="M0,32L21.8,58.7C43.6,85,87,139,131,165.3C174.5,192,218,192,262,170.7C305.5,149,349,107,393,106.7C436.4,107,480,149,524,144C567.3,139,611,85,655,80C698.2,75,742,117,785,144C829.1,171,873,181,916,176C960,171,1004,149,1047,128C1090.9,107,1135,85,1178,69.3C1221.8,53,1265,43,1309,48C1352.7,53,1396,75,1418,85.3L1440,96L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
        ></path>
      </svg>
      <section className="page2">
        <div className="right1">
          <p className="createdes">
            Click on the Add Product Button to create your store and start
            selling your products to the world.
          </p>
        </div>
        <div className="left1">
          <p
            className="create"
            onClick={() => {
              localStorage.setItem("signup", "productcreate");
              navigate("/sign");
            }}
          >
            Add Product
          </p>
        </div>
      </section>
      <section className="page3">
        <div className="left2">
          <p
            className="create"
            onClick={() => {
              navigate("/product");
              localStorage.setItem("type", "product");
            }}
          >
            Watch Products
          </p>
        </div>
        <div className="right2">
          <p className="createdes">
            Click on the Watch Product Button to see all your Stores Product
          </p>
        </div>
      </section>
      <section className="page4">
        <div className="right3">
          <p className="createdes">
            Click on the Update Button Updata your details of your Store and
            make it a better place for your customers.
          </p>
        </div>
        <div className="left3">
          <p
            className="create"
            onClick={() => {
              // setloginoptions("Store_Login");
              // navigate("/sign");
            }}
          >
            Update Details
          </p>
        </div>
      </section>
    </div>
  );
}
