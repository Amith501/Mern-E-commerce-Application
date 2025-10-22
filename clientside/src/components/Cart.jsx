import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  clearCart,
  updateCartQty,
  removeFromCart,
} from "../Redux/Feature/cartslice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth) || {};

  // Fetch cart when the component mounts
  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  console.log("Cart Items:", cartItems); // Debugging

  return (
    <div className="container">
      <h3>Cart Page</h3>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div key={product._id} className="product-container">
              <div className="grid-col3">
                <p> Total Quantity: {product?.qty}</p>

                <button className="btn btn-warning">
                  Total Price: ${product?.qty * product?.price}
                </button>
                <div className="left">
                  <img src={product.imageSrc} alt={product.title} width="100" />
                </div>
                <div className="center">{product?.title}</div>
                <div className="right mx-10">
                  {/* Increase Quantity */}
                  <button
                    onClick={() => {
                      dispatch(
                        updateCartQty({
                          productId: product._id,
                          action: "increase",
                          token,
                        })
                      );
                      toast.success(`Added 1 more ${product.title}!`);
                    }}
                    className="btn btn-success"
                  >
                    Quantity (+)
                  </button>

                  <button
                    disabled={cartItems.length == 1 ? true : null}
                    onClick={() => {
                      dispatch(
                        updateCartQty({
                          productId: product._id,
                          action: "decrease",
                          token,
                        })
                      );
                      toast.info(`Decreased quantity of ${product.title}`);
                    }}
                    className="btn btn-info"
                  >
                    Quantity (-)
                  </button>
                  <button
                    onClick={() => {
                      if (!product || !product._id) {
                        console.error("❌ Error: Invalid product data.");
                        return;
                      }

                      const confirmDelete = window.confirm(
                        `Are you sure you want to remove "${product.title}" from the cart?`
                      );
                      if (!confirmDelete) return;

                      try {
                        console.log("🗑 Removing Product ID:", product._id);

                        dispatch(
                          removeFromCart({
                            productId: product._id,
                            // cartItemId: cartItems._id,
                            token,
                          })
                        );

                        toast.info(
                          `Product "${product.title}" has been removed!`
                        );
                      } catch (error) {
                        console.error("❌ Failed to remove product:", error);
                        toast.error(
                          "Failed to remove the product. Please try again."
                        );
                      }
                    }}
                    className="btn btn-info px-10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-3">
          <Link to="/address">
            <button className="btn btn-primary me-2">Checkout</button>
          </Link>
          <button
            className="btn btn-warning"
            onClick={() => dispatch(clearCart(token))}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
