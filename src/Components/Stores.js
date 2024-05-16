import React from "react";
import Card from "./Card";
import "../css/Store.css";
import { useSelector } from "react-redux";

export default function Stores() {
  const mystate = useSelector((state) => state.settingstore);
  const stores = JSON.parse(localStorage.getItem("stores"));

  return (
    <div className="storeouter">
      <h1 className="heading">Stores</h1>
      <div className="contentbox">
        {stores?.length < mystate?.length ? (
          mystate?.length > 0 &&
          mystate?.map((store) => (
            <Card
              key={store._id}
              image={store.profile}
              name={store.storename}
              email={store.storeemail}
              incharge={store.storeIncharegename}
              branch={store.storeBranch}
              number={store.storeIncharegenumber}
            />
          ))
        ) : stores?.length > 0 ? (
          stores?.map((store) => (
            <Card
              key={store._id}
              unique={store._id}
              image={store.profile}
              name={store.storename}
              email={store.storeemail}
              incharge={store.storeIncharegename}
              branch={store.storeBranch}
              number={store.storeIncharegenumber}
            />
          ))
        ) : (
          <h1>No Stores</h1>
        )}
      </div>
    </div>
  );
}
