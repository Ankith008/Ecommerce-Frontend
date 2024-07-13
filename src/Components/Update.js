import React from "react";
import "../css/Update.css";

export default function Update() {
  return (
    <div className="outerup">
      <h3>Fill the input field which you want to update</h3>
      <form className="upform">
        <p>Name</p>
        <input type="text" placeholder="Enter the Name" />
        <p>Email</p>
        <input type="email" placeholder="Enter the Email" />
        <p>Password</p>
        <input type="password" placeholder="Enter the password" />
        <p>Address</p>
        <input type="text" placeholder="Enter the Address" />
        <button type="submit" className="submitbutton">
          Submit
        </button>
      </form>
    </div>
  );
}
