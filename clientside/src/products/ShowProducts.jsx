import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { fetchProducts } from "../Redux/Feature/productslice";
import { addToCart } from "../Redux/Feature/cartslice";
import { toast } from "react-toastify";

const ShowProducts = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.product);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="text-danger text-center my-5">Error: {error}</div>;

  return (
    <div className="container bg-dark text-light py-5">
      <div className="row justify-content-center">
        {products?.map((product) => (
          <div key={product._id} className="col-md-4 my-3">
            <div className="card text-center">
              <Link to={`/product/${product._id}`} className="my-3">
                <img
                  src={product.imageSrc || "/placeholder.jpg"} 
                  className="card-img-top border border-primary rounded"
                  alt={product.title || "Product Image"}
                  style={{ width: "200px", height: "200px" }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <h4 className="text-success">
                  {"₹"}
                  {product.price}
                </h4>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
