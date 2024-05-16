import React, { useEffect, useRef, useState, useContext } from "react";
import "../css/Shop.css";
import axios from "../api/axios";
import Card from "../Components/Card";
import CreateContext from "../Context/CreateContext";

export default function Shop() {
  const [item, setitem] = useState("");
  const [showrecom, setshowrecom] = useState(true);
  const [product, setproduct] = useState([]);
  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);

  const search = useRef(null);
  useEffect(() => {
    localStorage.setItem("type", "product");
  }, []);

  const handleresponse = async () => {
    try {
      const value = search.current.value;
      const response = await axios.get(`find/product/${value}`);
      const json = await response.data;
      if (json.success) {
        if (json.product.length === 0) {
          setalerthead("Notice");
          setalertdesc("No Product Found");
          setshowalert(true);
        }
        setproduct(json.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleresponses = async (text) => {
    try {
      const value = search.current.value;
      const response = await axios.get(`find/product/${text}`);
      const json = await response.data;
      if (json.success) {
        if (json.product.length === 0) {
          setalerthead("Notice");
          setalertdesc("No Product Found");
          setshowalert(true);
        }
        setproduct(json.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item !== "") {
      handleresponse();
    }
  }, [item]);

  const handlechange = () => {
    const element = search.current;
    if (element.value === "") {
      setshowrecom(true);
    } else {
      setshowrecom(false);
    }
  };

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      handleresponse();
    }
  };

  return (
    <>
      <h1 className="shophead">Shop</h1>
      <div className="shopouter">
        <input
          type="search"
          name="search"
          ref={search}
          id="search"
          onChange={handlechange}
          onKeyDown={handlekeydown}
          placeholder="Search Product ..."
          autoComplete="off"
        />

        {showrecom && (
          <div className="recommended">
            <p
              className="festival reco btn-anim btn"
              onClick={() => {
                handleresponses("festivalwear");
              }}
            >
              Festival Wear
            </p>
            <p
              className="party reco btn btn-anim"
              onClick={() => {
                handleresponses("partywear");
              }}
            >
              Party Wear
            </p>
            <p
              className="winter reco btn btn-anim"
              onClick={() => {
                handleresponses("winterwear");
              }}
            >
              Winter Wear
            </p>
            <p
              className="home reco btn btn-anim"
              onClick={() => {
                handleresponses("homeapplication");
              }}
            >
              Home Applications
            </p>

            <p
              className="electronic reco btn btn-anim"
              onClick={() => {
                handleresponses("electronic");
              }}
            >
              Eelectronic
            </p>
            <p
              className="phone reco btn btn-anim"
              onClick={() => {
                handleresponses("phone");
              }}
            >
              Phones
            </p>
            <p
              className="summer reco btn btn-anim"
              onClick={() => {
                handleresponses("summerwear");
              }}
            >
              Summer Wear
            </p>

            <p
              className="shoes reco btn btn-anim"
              onClick={() => {
                handleresponse("shoes");
              }}
            >
              Shoes
            </p>
          </div>
        )}
        <div className="contentbox">
          {product?.length > 0 ? (
            product.map((product) => {
              let sizes = [];
              product.Productsize.map((size) => {
                sizes.push(size);
              });
              return (
                <Card
                  key={product._id}
                  unique={product._id}
                  image={product.profile[0]}
                  name={product.Productname}
                  category={product.ProductCategorie}
                  price={product.Productprice}
                  size={sizes.join(", ")}
                />
              );
            })
          ) : (
            <h4>Find Your Desire</h4>
          )}
        </div>
      </div>
    </>
  );
}
