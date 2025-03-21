import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import RiceListings from "./pages/RiceListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/rice-listings" element={<RiceListings />} />
      </Routes>
    </Router>
  );
}

export default App;
