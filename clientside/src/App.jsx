import React, { useContext } from "react";
import AppContext from "./context/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowProducts from "./products/ShowProducts";
import ShowDetails from "./products/ShowDetails";
import Navbar from "./components/Navbar";
import Login from "./User/Login";
import Register from "./User/Register";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import AdminPanel from "./admin/AdminPanel";
import AdminRoute from "./admin/AdminRoute";
import SearchProducts from "./products/SearchProducts";
import Address from "./components/Address";
import Profile from "./User/Profile";
import CreateProduct from "./admin/CreateProduct";
import ProductsList from "./admin/ProductsList";
import Orderconfirmed from "./components/Orderconfirmed";
import Editproduct from "./admin/Editproduct";
import Manageuser from "./admin/Manageuser";
const App = () => {
  // const { products } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-product"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/fetch-all"
            element={
              <AdminRoute>
                <ProductsList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <Editproduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <AdminRoute>
                <Manageuser />
              </AdminRoute>
            }
          />
          <Route path="/" element={<ShowProducts />} />
          <Route path="/product/:id" element={<ShowDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<Orderconfirmed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/search/:term" element={<SearchProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
