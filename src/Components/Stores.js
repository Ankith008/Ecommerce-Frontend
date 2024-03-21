import React from "react";
import Card from "./Card";
import "../css/Store.css";
import { useSelector } from "react-redux";

export default function Stores() {
  const mystate = useSelector((state) => state.settingstore);

  return (
    <div className="storeouter">
      <h1 className="heading">Stores</h1>
      <div className="contentbox">
        {mystate.length > 0 &&
          mystate.map((store) => (
            <Card
              key={store._id}
              image={store.profile}
              name={store.storename}
              email={store.storeemail}
              incharge={store.storeIncharegename}
              branch={store.storeBranch}
              number={store.storeIncharegenumber}
            />
          ))}
      </div>
    </div>
  );
}
