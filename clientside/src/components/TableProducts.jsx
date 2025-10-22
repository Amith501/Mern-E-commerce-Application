import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartQty,
  removeFromCart,
} from "../Redux/Feature/cartslice";

const TableProducts = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth) || {};

  const cartItems = useSelector((state) => state.cart.cartItems || []);

  useEffect(() => {
    if (token) {
      dispatch(fetchCart(token));
    }
  }, [dispatch, token]);

  return (
    <div className="">
      <table className="table  text-light">
        <thead>
          <tr>
            <th scope="col">Product Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Increase</th>
            <th scope="col">Decrease</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product?.imageSrc || "/placeholder.jpg"}
                    width="50"
                    height="50"
                    alt={product?.title || "Product Image"}
                  />
                </td>
                <td>{product?.title || "N/A"}</td>
                <td>₹{product?.qty * product?.price}</td>
                <td>{product?.qty || 0}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      dispatch(
                        updateCartQty({
                          productId: product._id,
                          action: "increase",
                          token,
                        })
                      )
                    }
                  >
                    ➕
                  </button>
                </td>
                <td>
                  <button
                    disabled={cartItems.length == 1 ? true : null}
                    className="btn btn-sm btn-warning"
                    onClick={() =>
                      dispatch(
                        updateCartQty({
                          productId: product._id,
                          action: "decrease",
                          token,
                        })
                      )
                    }
                  >
                    ➖
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      dispatch(
                        removeFromCart({ productId: product._id, token })
                      )
                    }
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products in cart
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducts;
