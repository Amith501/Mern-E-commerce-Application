import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBoltLightning,
} from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../Redux/Feature/cartslice";
import SimilarProducts from "./SimilarProducts";
import { fetchProductById } from "../Redux/Feature/productslice";
import { toast } from "react-toastify";
const ShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector((state) => state.product);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

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
        <div className="left d-flex my-5">
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
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    productId: product._id,
                    title: product?.title,
                    price: product?.price,
                    qty: 1,
                    imageSrc: product?.imageSrc,
                    token,
                  })
                );

                // Show success toast notification
                toast.success(`${product.title} added to cart!`, {
                  position: "top-right",
                  autoClose: 2000, // Close after 2 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }}
              className="btn btn-warning me-2"
            >
              <FontAwesomeIcon icon={faCartShopping} className="me-2" />
              Add to Cart
            </button>
            
            <div className="my-5">
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

      {product && product.category && (
        <SimilarProducts category={product.category} />
      )}
    </>
  );
};

export default ShowDetails;
