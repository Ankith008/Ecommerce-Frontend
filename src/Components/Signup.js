import React, { useContext, useEffect, useState, useRef } from "react";
import "../css/Signup.css";
import logo from "../images/logo2.png";
import { Link } from "react-router-dom";
import axios, { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import CreateContext from "../Context/CreateContext";
import { useDispatch, useSelector } from "react-redux";
import { settingAuth } from "../actions";
import defaul from "../images/default.jpg";

export default function Signup() {
  const hloo = useRef();
  const accessToken = useSelector((state) => state.setting);
  const storeid = localStorage.getItem("storeid");
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
    size: "",
    price: "",
    productcat: "",
    productdec: "",
  });
  const [image, setimage] = useState(null);
  const [images, setimages] = useState([]);
  const localsigup = localStorage.getItem("signup");

  useEffect(() => {
    setshownav(false);
  }, [setshownav]);

  const element = hloo.current;
  if (element) {
    element.addEventListener("click", function () {
      document.querySelector("#inputprofile").click();
    });
  }

  useEffect(() => {
    if (!localsigup === "productcreate") {
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
  }, [localsigup]);
  const onchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

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
        } catch (error) {
          setalerthead("Error");
          setalertdesc("Please Try Login Again");
          setshowalert(true);
        }
      };
      fetchData();
    }
  }, []);

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

  const handlecreateproduct = async (e) => {
    e.preventDefault();
    const inputProfile = document.querySelector("#inputprofile");
    const files = inputProfile.files;

    if (files.length > 0) {
      const newImages = [...images];
      const imagePreviews = document.querySelectorAll(".imagespreviews");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newImages.push(file);
        const reader = new FileReader();

        reader.onload = (e) => {
          imagePreviews[i].src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
      setimages(newImages);
    }
  };

  const handleproductsubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const { name, size, price, productcat, productdec } = userdata;
    try {
      const formdata = new FormData();
      images.forEach((image) => {
        formdata.append("profile", image);
      });
      formdata.append("Productname", name);
      formdata.append("Productsize", size);
      formdata.append("Productprice", price);
      formdata.append("describtion", productdec);
      formdata.append("ProductCategorie", productcat);
      formdata.append("Storesname", storeid);

      const response = await axiosPrivate.post(
        "/auth/createproduct",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json = await response.data;
      setloading(false);
      if (json.success) {
        setalerthead("SUCCESS");
        setalertdesc("Your Product Has Been Created Successfully");
        setshowalert("true");
        navigate("/storeprofile");
      }
    } catch (error) {
      setloading(false);
      setalerthead("ERROR");
      setalertdesc("There is an error in Creating Product");
      setshowalert("true");
    }
  };

  useEffect(() => {
    if (localsigup === "productcreate" && window.innerWidth < 450) {
      const outer = document.querySelector(".outer");
      outer.style.marginTop = "100px";
    }
  }, [localsigup, window.innerWidth]);

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
      {localsigup === "User_signup" && (
        <form
          className="UserSignup"
          onSubmit={handleusersubmit}
          encType="multipart/form-data"
        >
          <h2>User Signup</h2>
          <div className="box">
            <img src={defaul} className="imagespreview" alt="profile" />
            <i id="hloo" ref={hloo} className="fa-solid fa-pen"></i>
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
      {localsigup === "User_Login" && (
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
      {localsigup === "Company_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handlecompanysignup}
          encType="multipart/form-data"
        >
          <h2>Company Signup</h2>
          <div className="box">
            <img src={defaul} className="imagespreview" alt="profile" />
            <i id="hloo" ref={hloo} className="fa-solid fa-pen"></i>
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
      {localsigup === "Company_Login" && (
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
      {localsigup === "Delivery_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handleDeliverysign}
          encType="multipart/form-data"
        >
          <h2>Delivery Gay Signup</h2>
          <div className="box">
            <img src={defaul} className="imagespreview" alt="profile" />
            <i id="hloo" ref={hloo} className="fa-solid fa-pen"></i>
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
      {localsigup === "Delivery_Login" && (
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
      {localsigup === "Store_Signup" && (
        <form
          className="UserSignup"
          onSubmit={handletext}
          encType="multipart/form-data"
        >
          <h2>Create Store</h2>
          <div className="box">
            <img src={defaul} className="imagespreview" alt="profile" />
            <i id="hloo" ref={hloo} className="fa-solid fa-pen"></i>
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
      {localsigup === "productcreate" && (
        <form
          className="UserSignup"
          onSubmit={handleproductsubmit}
          encType="multipart/form-data"
        >
          <h2>Create Product</h2>
          <div className="boxs">
            <div className="page1 page">
              <img
                src={defaul}
                className="imagespreviews imagespreview1"
                alt="profile"
              />
            </div>
            <div className="page2 page">
              <img
                src={defaul}
                className="imagespreviews imagespreview2"
                alt="profile"
              />
            </div>
            <div className="page3 page">
              <img
                src={defaul}
                className="imagespreviews imagespreview3"
                alt="profile"
              />
            </div>
            <div className="page4 page">
              <img
                src={defaul}
                className="imagespreviews imagespreview4"
                alt="profile"
              />
            </div>
            <div className="page5 page">
              <img
                src={defaul}
                className="imagespreviews imagespreview5"
                alt="profile"
              />
            </div>

            <i id="hloo" ref={hloo} className="fa-solid fa-pen"></i>
          </div>
          <input
            hidden
            type="file"
            name="profile"
            id="inputprofile"
            onChange={handlecreateproduct}
            multiple
          />
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="text"
            placeholder="Size Eg:S,M,L"
            name="size"
            id="name"
            required
            onChange={onchange}
          />
          <input
            type="Number"
            placeholder="Product Price"
            name="price"
            id="name"
            onChange={onchange}
            required
          />
          <input
            type="text"
            placeholder="Product Type Eg:Shirt,Trousers"
            name="productcat"
            id="phoneNumber"
            required
            onChange={onchange}
          />
          <textarea
            name="productdec"
            id="textdes"
            cols="30"
            rows="5"
            onChange={onchange}
            placeholder="Describe about your Product"
          ></textarea>

          <button className="submitbutton" type="submit">
            Create Product
          </button>
        </form>
      )}
    </div>
  );
}
