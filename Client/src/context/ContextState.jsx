import React from "react";
import { useEffect, useState } from "react";
import AppContext from "./Context";
import axios from "axios";
const ContextState = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get("http://localhost:3000/api/product/all", {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProducts(api.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <AppContext.Provider value={{ products }}>
        {props.children}
      </AppContext.Provider>
    </div>
  );
};
export default ContextState;
