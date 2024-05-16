import React from "react";
import Card from "./Card";
import "../css/Store.css";
import { useSelector } from "react-redux";

export default function Stores() {
  const mystate = useSelector((state) => state.settingstoredetail);
  const stores = JSON.parse(localStorage.getItem("stores"));
  const product = stores?.products;
  return (
    <div className="storeouter">
      <h1 className="heading">Products</h1>
      <div className="contentbox">
        {product?.length < mystate?.length
          ? mystate?.length > 0 &&
            mystate?.map((product) => {
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
          : product?.length > 0 &&
            product?.map((product) => {
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
            })}
      </div>
    </div>
  );
}
