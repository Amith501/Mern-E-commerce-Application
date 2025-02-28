import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../context/Context";
import SimilarProducts from "./SimilarProducts";

const ShowDetails = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchproduct = async () => {
      const api = await axios.get(`http://localhost:3000/api/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchproduct();
  }, [id]);

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div className="left d-flex  my-5 ">
          <img
            src={product?.imageSrc}
            alt="productimage"
            style={{
              height: "250px",
              width: "250px",
              border: "5px solid blue",
              borderRadius: "2px",
            }}
          />

          <div className="right">
            <h1>{product?.title}</h1>
            <h4>{product?.description}</h4>
            <h2>
              {"₹"}
              {product?.price}
            </h2>
            <div className="my-5">
              <button className=" btn btn-warning">
                <span>
                  <FontAwesomeIcon icon={faCartShopping} />
                </span>
                Add To Cart
              </button>
              <button className="btn btn-primary">
                <span>
                  <FontAwesomeIcon icon={faBoltLightning} />
                </span>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {products.length > 0 && <SimilarProducts category={product?.category} />}
    </>
  );
};

export default ShowDetails;
