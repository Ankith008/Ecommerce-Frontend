import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import ContextState from "./Context/ContextState";
import Profile from "./Components/Profile";

import Alert from "./Components/Alert";

function App() {
  return (
    <div className="hloo">
      <BrowserRouter>
        <ContextState>
          <Alert />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/sign" element={<Signup />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
          </Routes>
        </ContextState>
      </BrowserRouter>
    </div>
  );
}

export default App;
