import React, { useContext, useEffect, useState } from "react";
import "../css/Signup.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import CreateContext from "../Context/CreateContext";
import { useDispatch } from "react-redux";
import { settingAuth } from "../actions";

export default function Signup() {
  const dispatch = useDispatch();
  const {
    setshownav,
    loginoptions,
    setalerthead,
    setalertdesc,
    setshowalert,
    setloading,
  } = useContext(CreateContext);

  const navigate = useNavigate();

  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    ownernum: "",
    ownername: "",
    location: "",
    Deliveryprice: "",
    AreaDelivery: "",
    branch: "",
    inchargename: "",
    categories: [],
    Address: "",
  });
  const [image, setimage] = useState(null);

  useEffect(() => {
    setshownav(false);
  }, [setshownav]);

  useEffect(() => {
    if (
      loginoptions === "User_signup" ||
      loginoptions === "Company_Signup" ||
      loginoptions === "Delivery_Signup" ||
      loginoptions === "Store_Signup"
    ) {
      document.querySelector("#hloo").addEventListener("click", function () {
        document.querySelector("#inputprofile").click();
      });
    }
  }, [loginoptions]);

  useEffect(() => {
    if (
      loginoptions === "User_signup" ||
      loginoptions === "Company_Signup" ||
      loginoptions === "Delivery_Signup" ||
      loginoptions === "Store_Signup"
    ) {
      const imagespreview = document.querySelector(".imagespreview");
      const inputprofile = document.querySelector("#inputprofile");
      inputprofile.addEventListener("change", function () {
        const file = inputprofile.files[0];
        if (file) {
          setimage(file);
          const reader = new FileReader();
          reader.onload = (e) => (imagespreview.src = e.target.result);
          reader.readAsDataURL(file);
        }
      });
    }
  }, [image, loginoptions]);

  const onchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleusersubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const { name, email, phoneNumber, password, Address } = userdata;

    const formdata = new FormData();
    formdata.append("profile", image);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("password", password);
    formdata.append("Address", Address);

    try {
      const response = await axios.post("/auth/createuser", formdata, {
        withCredentials: true,
      });
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Signed Up");
        setshowalert("true");
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("Invalid Email or Password");
        setshowalert("true");
        setloading(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleuserlogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const { email, password } = userdata;
    try {
      const response = await axios.post(
        "/auth/loginuser",
        { email: email, password: password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Logged In");
        setshowalert(false);
        // navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("Invalid Email or Password");
        setshowalert(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeliverylogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const { email, password } = userdata;
    try {
      const response = await axios.post(
        "/auth/logindeliveryboy",
        { deliveryboyemail: email, deliveryboypassword: password },
        { withCredentials: true }
      );
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Logged In");
        setshowalert("true");
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("Invalid Email or Password");
        setshowalert(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handlecompanylogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const { email, password } = userdata;
    try {
      const response = await axios.post(
        "/auth/logincompany",
        {
          companyemail: email,
          companypassword: password,
        },
        {
          withCredentials: true,
        }
      );

      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have successfully logged in");
        setshowalert("true");
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("Invalid Email or Password");
        setshowalert(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeliverysign = async (e) => {
    e.preventDefault();
    setloading(true);
    const { name, email, phoneNumber, password, Deliveryprice, AreaDelivery } =
      userdata;

    const formdata = new FormData();
    formdata.append("profile", image);
    formdata.append("deliveryboyname", name);
    formdata.append("deliveryboyemail", email);
    formdata.append("deliveryboypassword", password);
    formdata.append("deliveryboyphone", phoneNumber);
    formdata.append("deliveryboyAreaDelivery", AreaDelivery);
    formdata.append("deliveryboyPrices", Deliveryprice);
    try {
      const response = await axios.post("/auth/createdeliveryboy", formdata, {
        withCredentials: true,
      });
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Signed Up");
        setshowalert("true");
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handlecompanysignup = async (e) => {
    e.preventDefault();
    setloading(true);
    const { name, email, password, location, ownername, ownernum } = userdata;

    const formdata = new FormData();
    formdata.append("profile", image);
    formdata.append("companyname", name);
    formdata.append("companyemail", email);
    formdata.append("companypassword", password);
    formdata.append("companyowner", ownername);
    formdata.append("companyownernumber", ownernum);
    formdata.append("companylocation", location);
    try {
      const response = await axios.post("/auth/createcompany", formdata, {
        withCredentials: true,
      });
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Signed Up");
        setshowalert("true");
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("Invalid Email or Password");
        setshowalert(false);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handletext = async (e) => {
    e.preventDefault();
    setloading(true);
    const {
      name,
      email,
      location,
      branch,
      inchargename,
      phoneNumber,
      categories,
    } = userdata;

    const formdata = new FormData();
    formdata.append("profile", image);
    formdata.append("storename", name);
    formdata.append("storeemail", email);
    formdata.append("storeAddress", location);
    formdata.append("storeBranch", branch);
    formdata.append("storeIncharegename", inchargename);
    formdata.append("storeIncharegenumber", phoneNumber);
    formdata.append("categories", JSON.stringify(categories));

    try {
      const response = await axios.post(
        "/auth/createStore",
        formdata,

        {
          withCredentials: true,
        }
      );
      const json = await response.data;
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("You have Successfully Created Store");
        setshowalert(true);
        navigate("/profile");
        dispatch(settingAuth(json.accessToken));
        setloading(false);
      } else {
        setalerthead("ERROR");
        setalertdesc("There is an error in Creating Store");
        setshowalert(true);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  return (
    <div className="outer">
      <p className="lsf">
        <img className="logoimg" src={logo} alt="logo" />
        Kutta
      </p>
      <div className="Link">
        <Link to="/" onClick={() => setshownav(true)}>
          <p>Back</p>
        </Link>
      </div>
      {loginoptions === "User_signup" && (
        <form
          className="UserSignup"
          onSubmit={handleusersubmit}
          encType="multipart/form-data"
        >
          <h2>User Signup</h2>
          <div className="box">
            <img
              src="https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"
              className="imagespreview"
              alt="profile"
            />
            <i id="hloo" className="fa-solid fa-pen"></i>
          </div>
          <input hidden type="file" name="profile" id="inputprofile" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            onChange={onchange}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            required
            onChange={onchange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            id="password"
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Address"
            name="Address"
            required
            id="Address"
            onChange={onchange}
          />
          <button className="submitbutton" type="submit">
            Signup
          </button>
        </form>
      )}
      {loginoptions === "User_Login" && (
        <form className="UserSignup" onSubmit={handleuserlogin}>
          <h2>User Login</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            id="email"
            onChange={onchange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            onChange={onchange}
          />
          <button className="submitbutton" type="submit">
            Login
          </button>
        </form>
      )}
      {loginoptions === "Company_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handlecompanysignup}
          encType="multipart/form-data"
        >
          <h2>Company Signup</h2>
          <div className="box">
            <img
              src="https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"
              className="imagespreview"
              alt="profile"
            />
            <i id="hloo" className="fa-solid fa-pen"></i>
          </div>
          <input hidden type="file" name="profile" id="inputprofile" />
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            id="name"
            onChange={onchange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={onchange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Company Owner Number"
            name="ownernum"
            id="ownernum"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Company Owner"
            name="ownername"
            required
            id="ownername"
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            id="location"
            onChange={onchange}
            required
          />
          <button className="submitbutton" type="submit">
            Signup
          </button>
        </form>
      )}
      {loginoptions === "Company_Login" && (
        <form className="UserSignup" onSubmit={handlecompanylogin}>
          <h2>Company Login</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={onchange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            id="password"
            onChange={onchange}
          />
          <button className="submitbutton" type="submit">
            Login
          </button>
        </form>
      )}
      {loginoptions === "Delivery_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handleDeliverysign}
          encType="multipart/form-data"
        >
          <h2>Delivery Gay Signup</h2>
          <div className="box">
            <img
              src="https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"
              className="imagespreview"
              alt="profile"
            />
            <i id="hloo" className="fa-solid fa-pen"></i>
          </div>
          <input hidden type="file" name="profile" id="inputprofile" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            onChange={onchange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            onChange={onchange}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            onChange={onchange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={onchange}
            required
          />
          <input
            type="text"
            placeholder="Areas for Delivery"
            name="AreaDelivery"
            id="AreaDelivery"
            onChange={onchange}
            required
          />
          <input
            type="text"
            placeholder="Delivery Price"
            name="Deliveryprice"
            id="Deliveryprice"
            required
            onChange={onchange}
          />
          <button className="submitbutton" type="submit">
            Signup
          </button>
        </form>
      )}
      {loginoptions === "Delivery_Login" && (
        <form className="UserSignup" onSubmit={handleDeliverylogin}>
          <h2>Delivery Gay Login</h2>

          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            required
            onChange={onchange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            onChange={onchange}
          />
          <button className="submitbutton" type="submit">
            Login
          </button>
        </form>
      )}
      {loginoptions === "Store_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handletext}
          encType="multipart/form-data"
        >
          <h2>Create Store</h2>
          <div className="box">
            <img
              src="https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png"
              className="imagespreview"
              alt="profile"
            />
            <i id="hloo" className="fa-solid fa-pen"></i>
          </div>
          <input hidden type="file" name="profile" id="inputprofile" />
          <input
            type="text"
            placeholder="Store Name"
            name="name"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Branch Name"
            name="branch"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Store Incharge Name"
            name="inchargename"
            id="name"
            onChange={onchange}
            required
          />
          <input
            type="text"
            placeholder="Store Address"
            name="location"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Categories of Products"
            name="categories"
            required
            id="name"
            onChange={onchange}
          />
          <input
            type="email"
            placeholder="Store Email"
            name="email"
            id="email"
            onChange={onchange}
            required
          />
          <input
            type="tel"
            placeholder="Store Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            required
            onChange={onchange}
          />

          <button className="submitbutton" type="submit">
            Signup
          </button>
        </form>
      )}
    </div>
  );
}
