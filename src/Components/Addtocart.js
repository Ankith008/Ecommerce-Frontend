import React, { useEffect, useState, useContext } from "react";
import "../css/Store.css";
import Card from "./Card";
import axiosPrivate from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { settingAuth } from "../actions/index";
import CreateContext from "../Context/CreateContext";

export default function Addtocart() {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const { setalerthead, setalertdesc, setshowalert, setloading } =
    useContext(CreateContext);

  async function fetchData() {
    try {
      const response = await axiosPrivate.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );
      const json = await response.data;
      await dispatch(settingAuth(json.accessToken));
      handleaddtocart();
    } catch (error) {
      setalerthead("Error");
      setalertdesc("Please Try Login Again");
      setshowalert(true);
    }
  }

  async function handleaddtocart() {
    const response = await axiosPrivate.post(
      "/find/addtocartproduct",
      {},
      { withCredentials: true }
    );
    const json = await response.data;
    setproducts(json.product);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="storeouter">
      <h1 className="heading">Carts</h1>
      <div className="contentbox">
        {products?.length > 0 &&
          products?.map((product) => {
            let sizes = [];
            product.Productsize.map((size) => sizes.push(size));
            return (
              <Card
                key={product?._id}
                unique={product?._id}
                image={product?.profile[0]}
                name={product?.Productname}
                category={product?.ProductCategorie}
                price={product?.Productprice}
                size={sizes?.join(", ")}
              />
            );
          })}
      </div>
    </div>
  );
}
