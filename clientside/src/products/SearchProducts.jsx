import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios"; // 

const SearchProducts = () => {
  const [searchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/search?query=${term}`
        );
        setSearchProduct(response.data.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (term) {
      fetchSearchResults();
    }
  }, [term]);

  return (
    <div className="container text-center">
      <div className="container bg-dark d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {searchProduct?.map((product) => (
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
                <div className="card-body">
                  <h5 className="card-title mx-3">{product.title}</h5>
                  <button className="btn btn-primary align-items-center my-3">
                    {"₹"} {product.price}
                  </button>
                  <button className="btn btn-warning mx-3">
                    <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {searchProduct.length === 0 && (
            <p className="text-white">No products found for "{term}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
