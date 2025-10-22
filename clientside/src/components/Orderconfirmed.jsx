import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const { latestorder } = useSelector((state) => state.payments);

  useEffect(() => {
    if (!latestorder) {
      navigate("/"); // Redirect if no order found
    }
  }, [latestorder, navigate]);

  if (!latestorder) {
    return <p className="text-center mt-5 text-secondary">Loading...</p>;
  }

  const {
    orderItems,
    userShipping: address,
    amount,
    paymentstatus,
    createdAt,
  } = latestorder;

  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd/MM/yyyy")
    : "Invalid Date";

  if (!orderItems || orderItems.length === 0) {
    return (
      <p className="text-danger text-center mt-5">No items in the order.</p>
    );
  }

  return (
    <div className="container my-5 text-light bg-dark p-4 rounded">
      <h1 className="text-success mb-3">Order Confirmed!</h1>
      <p className="lead">
        Thank you for your purchase. Here are your order details:
      </p>

      {/* Order Summary */}
      <div className="bg-dark text-white p-4 rounded mb-4">
        <h2 className="text-warning mb-3">Order Summary</h2>
        <ul className="list-unstyled">
          {orderItems.map((item, index) => (
            <li
              key={index}
              className="d-flex align-items-center border-bottom py-3"
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="me-3 rounded"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <p className="fw-bold mb-1">{item.title}</p>
                <small className="text-light">
                  Qty: {item.qty} | Price: ₹{parseFloat(item.price).toFixed(2)}
                </small>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 fw-bold fs-5">Total: ₹{amount}</div>
        <div className="text-light">Status: {paymentstatus}</div>
        <div className="text-light">Date: {formattedDate}</div>
      </div>

      {/* Shipping Address */}
      <div className="bg-dark text-white p-4 rounded">
        <h2 className="text-warning mb-3">Shipping Address</h2>
        {address ? (
          <ul className="list-unstyled lh-lg">
            <li>
              <strong>Name:</strong> {address.fullname}
            </li>
            <li>
              <strong>Phone:</strong> {address.phoneNumber}
            </li>
            <li>
              <strong>Address:</strong> {address.address}, {address.city},{" "}
              {address.state}, {address.country} - {address.pincode}
            </li>
          </ul>
        ) : (
          <p className="text-danger">No shipping address found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmed;
