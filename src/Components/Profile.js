import React, { useContext, useEffect } from "react";
import "../css/Profile.css";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  settingstore,
  settingAuth,
  settingstoredetail,
} from "../actions/index";

export default function Profile() {
  const dispatch = useDispatch();
  const mystate = useSelector((state) => state.settingstoredetail);
  const {
    setloginoptions,
    setshownav,
    setloading,
    setalertdesc,
    setalerthead,
    setshowalert,
  } = useContext(CreateContext);
  const navigate = useNavigate();

  const finddetails = async () => {
    try {
      const response = await axiosPrivate.post("auth/finddetail");
      dispatch(settingstoredetail(response.data.company));
    } catch (error) {
      console.error("Error finding details:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      const json = await response.data;
      await dispatch(settingAuth(json.accessToken));
      finddetails();
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Please Try Login Again");
      setshowalert(true);
    }
  };

  useEffect(() => {
    setshownav(true);
    fetchData();
  }, []);

  const findstores = async () => {
    setloading(true);
    try {
      const response = await axiosPrivate.get("/find/stores");
      dispatch(settingstore(response.data.stores));
      localStorage.setItem("stores", JSON.stringify(response.data.stores));
      setloading(false);
      navigate("/store");
    } catch (error) {
      setalerthead("Error");
      setalertdesc(
        "Please Try Login Again or There is an Internal Server Error"
      );
      setshowalert(true);
      console.error("Error finding stores:", error);
      setloading(false);
    }
  };

  return (
    <div className="profileouter">
      <h2>Company</h2>
      <section className="desc">
        <div className="left ">
          <img
            src={
              !mystate.profile
                ? "https://www.w3schools.com/howto/img_avatar.png"
                : mystate.profile
            }
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="right">
          <div className="companydetails">
            <p>
              <span>Company Name :</span>
              {mystate.companyname}
            </p>
            <p>
              <span>Company Owner :</span>
              {mystate.companyowner}
            </p>
            <p>
              <span>Company Email :</span>
              {mystate.companyemail}
            </p>
            <p>
              <span>Company Contact :</span>
              {mystate.companyownernumber}
            </p>
            <p className="company-location" title={mystate.companylocation}>
              <span>Company Location :</span>
              {mystate?.companylocation?.slice(0, 16) + "..."}
            </p>
            <div class="location-tooltip">{mystate.companylocation}</div>
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
            Click on the Create Button to create your store and start selling
            your products to the world.
          </p>
        </div>
        <div className="left1">
          <p
            className="create"
            onClick={() => {
              localStorage.setItem("signup", "Store_Signup");
              navigate("/sign");
            }}
          >
            Create Store
          </p>
        </div>
      </section>
      <section className="page3">
        <div className="left2">
          <p
            className="create"
            onClick={() => {
              findstores();
              // navigate("/store");
              localStorage.setItem("type", "store");
            }}
          >
            Watch Store
          </p>
        </div>
        <div className="right2">
          <p className="createdes">
            Click on the Watch Store Button to see all your Stores
          </p>
        </div>
      </section>
      <section className="page4">
        <div className="right3">
          <p className="createdes">
            Click on the Update Button Updata your details of your Company and
            make it a better place for your customers.
          </p>
        </div>
        <div className="left3">
          <p
            className="create"
            onClick={() => {
              setloginoptions("Store_Login");
              navigate("/sign");
            }}
          >
            Update Details
          </p>
        </div>
      </section>
    </div>
  );
}
