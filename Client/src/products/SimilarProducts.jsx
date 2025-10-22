import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
const SimilarProducts = ({ category }) => {
  const { products } = useContext(AppContext);

  const [SimilarProducts, SetSimilarproducts] = useState([]);

  useEffect(() => {
    SetSimilarproducts(
      products.filter(
        (data) => data.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container text-center">
      <h1 className="text-center">Similar Products</h1>
      <div className="container bg-dark d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {SimilarProducts?.map((product) => (
            <div
              key={product._id}
              className="my-3 col-md-4  d-flex justify-content-center align-items-center "
            >
              <div
                className="card text-align-items-center"
                style={{ width: "18rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center my-3"
                >
                  <img
                    src={product.imageSrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid blue",
                      borderRadius: "5px",
                    }}
                  />
                </Link>

                <div className="card-body ">
                  <h5 className="card-title mx-3">{product.title}</h5>

                  <button
                    href="#"
                    className="btn btn-primary align-items-center my-3 "
                  >
                    {"₹"} {""} {product.price}
                  </button>
                  <button href="#" className="btn btn-warning mx-3">
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
