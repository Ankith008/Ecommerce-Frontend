import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import axiosPrivate from "../api/axios";
import "../css/ProductProfile.css";
import { settingAuth } from "../actions/index";
import { useDispatch } from "react-redux";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";

export default function ProductProfile() {
  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);
  const [pro, setpro] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localproductid = localStorage.getItem("productid");
  const store = JSON.parse(localStorage.getItem("stores"));
  const sizeref = useRef([]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  const handlesizeclick = (text, index) => {
    setSelectedSize(text);
    setSelectedSizeIndex(index);
  };

  const pictures = pro?.profile;
  const hlo = pro?.Productsize;

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      const json = await response.data;
      dispatch(settingAuth(json.accessToken));
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Please Try Login Again");
      setshowalert(true);
    }
  };

  const localproductids = localStorage.getItem("productid");
  const handlefindproduct = async () => {
    const response = await axios.get(
      `find/productdetails/${localproductids}`,
      {}
    );
    const json = await response.data;
    setpro(json.product);
  };

  useEffect(() => {
    fetchData();
    handlefindproduct();
  }, []);

  const handleaddtochart = async () => {
    try {
      const productid = localStorage.getItem("productid");
      const response = await axiosPrivate.post(
        `find/addtocart/${productid}`,
        {},
        {
          withCredentials: true,
        }
      );

      const json = await response.data;
      if (json.success) {
        setalertdesc("Product Added to Cart Successfully");
        setalerthead("Success");
        setshowalert(true);
      }
    } catch (error) {
      setalertdesc("Please Try Again");
      setalerthead("Error");
      setshowalert(true);
    }
  };

  const handleorderclick = async () => {
    try {
      if (selectedSize === null) {
        setalertdesc("Please Select Size");
        setalerthead("Error");
        setshowalert(true);
        return;
      }
      if (selectedQuantity === null) {
        setalertdesc("Please Select Quantity");
        setalerthead("Error");
        setshowalert(true);
        return;
      }

      const productid = localStorage.getItem("productid");
      const response = await axiosPrivate.post(
        `find/orders/${productid}`,
        {
          size: selectedSize,
          quantity: selectedQuantity,
          finalprice: selectedQuantity * pro.Productprice,
        },
        {
          withCredentials: true,
        }
      );

      const json = await response.data;
      if (json.success) {
        navigate("/placed");
      }
    } catch (error) {
      setalertdesc("Please Try Again");
      setalerthead("Error");
      setshowalert(true);
    }
  };

  const localsignin = localStorage.getItem("currentsignup");

  return (
    <div className="productpre">
      <div className="proouter">
        <div className="proleft">
          <div className="proimage">
            {pictures?.map((ele, index) => (
              <img src={ele} key={index} className="image" alt="product" />
            ))}
          </div>
        </div>
        <div className="proright">
          <p className="prodet">Product Details</p>
          <p className="proname">
            Product Name : <span className="pn">{pro.Productname}</span>
          </p>

          <div className="proprice">
            <p className="price">Price: {pro.Productprice}/-</p>
          </div>
          <div className="proquenty">
            <p className="que">Quantity : </p>
            <input
              type="number"
              className="quenty"
              placeholder="0"
              onChange={(event) => {
                setSelectedQuantity(event.target.value);
              }}
            />
          </div>
          <div className="prosize">
            {hlo?.map((ele, index) => {
              return (
                <div
                  className="content"
                  key={index}
                  onClick={() => {
                    handlesizeclick(sizeref[index].textContent, index);
                  }}
                  style={{
                    boxShadow:
                      selectedSizeIndex === index
                        ? "2px 2px 5px 2px green,-2px -2px 5px 2px green"
                        : "2px 5px 2px rgba(0, 0, 0, 0.5),-2px -2px 5px 2px rgba(0, 0, 0, 0.5)",
                    color: selectedSizeIndex === index ? "green" : "black",
                    fontWeight: selectedSizeIndex === index ? "600" : "400",
                  }}
                >
                  <p ref={(el) => (sizeref[index] = el)}>{ele}</p>
                </div>
              );
            })}
          </div>
          <div className="prodescription">
            <p className="descphead">Description</p>
            <p className="descp">{pro.describtion}</p>
          </div>
          <div
            className="probuttons"
            style={{
              display:
                localsignin === "Company_Login" ||
                localsignin === "Company_signup"
                  ? "none"
                  : "flex",
            }}
          >
            <button
              className="btn btn-anim addtocart"
              onClick={() => handleaddtochart()}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-anim buynow"
              onClick={() => handleorderclick()}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    // <h1>sdf</h1>
  );
}
