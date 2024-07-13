import React, { useContext, useEffect, useState } from "react";
import "../css/Profile.css";
import "../css/Update.css";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { settingAuth } from "../actions/index";

// import Update from "./Update";

export default function CusProfile() {
  const dispatch = useDispatch();
  const [currentid, setCurrentid] = useState("");
  const mystate = useSelector((state) => state.setting);
  const {
    setloginoptions,
    setshownav,
    setloading,
    setalertdesc,
    setalerthead,
    setshowalert,
  } = useContext(CreateContext);
  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState({});
  const [showupdateoption, setshowupdateoption] = useState(false);

  const [updatedata, setupdatedata] = useState({
    name: "",
    email: "",
    prepassword: "",
    newpassword: "",
    address: "",
    phoneNumber: "",
  });

  const onchange = (e) => {
    setupdatedata({ ...updatedata, [e.target.name]: e.target.value });
  };

  const handleupdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("auth/update", {
        ...updatedata,
        id: currentid,
      });
      if (response.data.success === true) {
        setshowupdateoption(false);
        setalerthead("Success");
        setalertdesc("Details Updated Successfully");
        setshowalert(true);
      }
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Please Check the Details and Try Again");
      setshowalert(true);
    }
  };

  const finddetails = async () => {
    try {
      const response = await axiosPrivate.post("auth/finddetail");
      dispatch(settingAuth(response.data.user));
      setCurrentid(response.data.user.id);
      setformvalues(response.data.user);
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
      await finddetails();
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

  return (
    <>
      {showupdateoption && (
        <div className="outerup">
          <h3>Fill the input field which you want to update</h3>
          <form className="upform" onSubmit={(e) => handleupdateSubmit(e)}>
            <p>Name</p>
            <input
              type="text"
              name="name"
              placeholder="Enter the Name"
              value={updatedata.name || formvalues.name}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />
            <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter the Email"
              value={updatedata.email || formvalues.email}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />

            <p>Address</p>
            <input
              type="text"
              name="address"
              placeholder="Enter the Address"
              value={updatedata.address || formvalues.Address}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />
            <p>Phone Number</p>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Enter the Phone Number"
              value={updatedata.phoneNumber || formvalues.phoneNumber}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />
            <p>old Password</p>
            <input
              type="password"
              name="prepassword"
              placeholder="Enter the Old password"
              value={updatedata.password}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />
            <p>New Password</p>
            <input
              type="password"
              name="newpassword"
              placeholder="Enter the New password"
              value={updatedata.password}
              onChange={(e) => {
                onchange(e);
              }}
              required
            />
            <button type="submit" className="submitbutton">
              Submit
            </button>
          </form>
        </div>
      )}
      <div className="profileouter">
        <h2 style={{ whiteSpace: "nowrap" }}>Hi {mystate.name}</h2>
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
                <span> Name :</span>
                {mystate.name}
              </p>

              <p>
                <span> Email :</span>
                {mystate.email}
              </p>
              <p>
                <span> Contact :</span>
                {mystate.phoneNumber}
              </p>
              <p className="company-location" title={mystate.Address}>
                <span>Company Location :</span>
                {mystate?.Address?.slice(0, 16) + "..."}
              </p>
              <div class="location-tooltip">{mystate.Address}</div>
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
              Click on the View Orders Button to Explore all your Orders
            </p>
          </div>
          <div className="left1">
            <p
              className="create"
              onClick={() => {
                navigate("/order");
              }}
            >
              View Orders
            </p>
          </div>
        </section>
        <section className="page3">
          <div className="left2">
            <p
              className="create"
              onClick={() => {
                navigate("/addtocart");
              }}
            >
              View Cart
            </p>
          </div>
          <div className="right2">
            <p className="createdes">
              Click on the View Cart Button to see all the products you have in
              your cart.
            </p>
          </div>
        </section>
        <section className="page4">
          <div className="right3">
            <p className="createdes">
              Click on the Update Button Updata your details of your Profile
            </p>
          </div>
          <div className="left3">
            <p
              className="create"
              onClick={() => {
                setshowupdateoption(true);
                window.scrollTo(0, 0);
              }}
            >
              Update Details
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
