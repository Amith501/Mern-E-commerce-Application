import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const SimilarProducts = ({ category }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (category && products?.length) {
      const filteredProducts = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      );

      setSimilarProducts(filteredProducts);
    }
  }, [category, products]);

  if (loading) return <div className="text-center text-light">Loading...</div>;
  if (error)
    return <div className="text-center text-danger">Error: {error}</div>;

  return (
    <div className="container text-center">
      <h1 className="text-center">Similar Products</h1>
      <div className="container bg-dark d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {similarProducts.length > 0 ? (
            similarProducts.map((product) => (
              <div
                key={product._id}
                className="my-3 col-md-4 d-flex justify-content-center align-items-center"
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
                      src={product.imageSrc || "/placeholder.jpg"}
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

                  <div className="card-body">
                    <h5 className="card-title mx-3">{product.title}</h5>

                    <button className="btn btn-primary align-items-center my-3">
                      ₹ {product.price}
                    </button>
                    <button className="btn btn-warning mx-3">
                      <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-light">No similar products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
