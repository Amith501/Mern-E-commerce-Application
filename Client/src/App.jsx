import React, { useContext } from "react";
import AppContext from "./context/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowProducts from "./products/ShowProducts";
import ShowDetails from "./products/ShowDetails";
import Navbar from "./components/Navbar";
const App = () => {
  const { products } = useContext(AppContext);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowProducts />} />
          <Route path="/product/:id" element={<ShowDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
