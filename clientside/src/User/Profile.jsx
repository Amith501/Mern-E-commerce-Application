import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userorder } from "../Redux/Feature/Ordersslice";

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { orders, loadingUserOrders, errorUserOrders } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (token) {
      dispatch(userorder({ token }));
    }
  }, [dispatch, token]);

  console.log("Token:", token);
  console.log("Orders:", orders);
  console.log("Loading:", loadingUserOrders);
  console.log("Error:", errorUserOrders);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Your Orders</h2>

      {loadingUserOrders ? (
        <p className="text-info">Loading orders...</p>
      ) : errorUserOrders ? (
        <p className="text-danger">Error: {errorUserOrders}</p>
      ) : orders && orders.length > 0 ? (
        <div className="row">
          {orders.map((order, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="border p-3 rounded bg-dark text-light">
                <p className="text-warning">Order ID: {order.orderId}</p>
                <p className="text-success">Amount: ₹{order.amount}</p>
                {order.orderItems.map((item, idx) => (
                  <p key={idx} className="text-light mb-1">
                    {item.title} x {item.qty} - ₹{item.price}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Profile;
