import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextState from "./Context/ContextState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextState>
    <App />
  </ContextState>
);

reportWebVitals();
