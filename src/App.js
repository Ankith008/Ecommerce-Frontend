import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import ContextState from "./Context/ContextState";
import Profile from "./Components/Profile";
import Loader from "./Components/Loader";
import Alert from "./Components/Alert";
import Stores from "./Components/Stores";
import Card from "./Components/Card";
import Storeprofile from "./Components/Storeprofile";
import ProductProfile from "./Components/ProductProfile";
import Notfound from "./Components/Notfound";
import Product from "./Components/Product";
import Notification from "./Components/Notification";
import Shop from "./Components/Shop";
import OrderPlaced from "./Components/OrderPlaced";
import NotCard from "./Components/NotCard";
import CusProfile from "./Components/CusProfile";
import Addtocart from "./Components/Addtocart";

function App() {
  return (
    <div className="hloo">
      <BrowserRouter>
        <ContextState>
          <Alert />
          <Navbar />
          <Loader />
          <Routes>
            <Route exact path="/card" element={<Card />}></Route>
            <Route
              exact
              path="/storeprofile"
              element={<Storeprofile />}
            ></Route>
            <Route exact path="/store" element={<Stores />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/sign" element={<Signup />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route
              exact
              path="/productprofile"
              element={<ProductProfile />}
            ></Route>
            <Route exact path="/product" element={<Product />}></Route>
            <Route exact path="/order" element={<Notification />}></Route>
            <Route path="*" element={<Notfound />}></Route>
            <Route exact path="/shop" element={<Shop />}></Route>
            <Route exact path="/placed" element={<OrderPlaced />}></Route>
            <Route exact path="/notcard" element={<NotCard />}></Route>
            <Route exact path="/user" element={<CusProfile />}></Route>
            <Route exact path="/addtocart" element={<Addtocart />}></Route>
          </Routes>
        </ContextState>
      </BrowserRouter>
    </div>
  );
}

export default App;
