import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableProducts from "./TableProducts";
import OldAddress from "./OldAddress";
import { createPayment, verifypayment } from "../Redux/Feature/paymentslice";
import { clearCart } from "../Redux/Feature/cartslice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const { address } = useSelector((state) => state.checkout);

  const handlePayments = async () => {
    try {
      if (!address) {
        alert("Please add your shipping address before proceeding.");
        return;
      }

      // Calculate total price and total quantity
      const price = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.qty,
        0
      );
      const qty = cartItems.reduce((acc, item) => acc + item.qty, 0);

      const payload = {
        amount: price,
        cartItems,
        qty,
        userAddress: address,
        userId: user._id,
      };

      const response = await dispatch(createPayment(payload)).unwrap();
      const { orderId, amount, razorpayKey } = response;

      if (!orderId || !window.Razorpay) {
        alert("Payment initiation failed. Please try again.");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "Amith Developer",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            await dispatch(
              verifypayment({
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
                amount,
                orderItems: cartItems,
                userId: user._id,
                userShipping: address,
              })
            ).unwrap();

            toast.success("🎉 Payment verified & order placed!");
            dispatch(clearCart());
            navigate("/order-confirmed");
          } catch (err) {
            toast.error("❌ Payment verification failed");
            console.error("Verification failed:", err);
          }
        },
        prefill: {
          name: user?.name || "Test User",
          email: user?.email || "test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: address?.fullAddress || "N/A",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("❌ Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("❌ Payment initiation failed:", error);
      alert(`Payment failed to initiate: ${error?.message || error}`);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2>Order Summary</h2>
      </div>

      <div>
        <table className="table table-bordered border-warning">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TableProducts />
              </td>
              <td>
                <OldAddress />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center my-5">
        <button onClick={handlePayments} className="btn btn-warning">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
