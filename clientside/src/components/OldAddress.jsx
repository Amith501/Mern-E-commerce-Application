import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettaddress } from "../Redux/Feature/Checkoutslice";

const OldAddress = () => {
  const dispatch = useDispatch();

  // Correct token retrieval from Redux
  const token = useSelector((state) => state.auth.token);
  const { address, status, error } = useSelector((state) => state.checkout);

  //   console.log("📦 token:", token);
  //   console.log("📬 address:", address);
  //   console.log("⚠️ status:", status);
  //   console.log("❌ error:", error);

  useEffect(() => {
    if (token) {
      dispatch(gettaddress(token)).then((res) => {
        console.log(" gettaddress dispatch response:", res);
      });
    } else {
      console.warn("❌ No token found in Redux");
    }
  }, [token, dispatch]);

  if (status === "loading") return <p>Loading address...</p>;
  if (status === "failed")
    return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <>
      <td className="text-dark">
        {address ? (
          <ul
            style={{
              fontWeight: "bold",
              listStyleType: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <strong>Name:</strong> {address.fullname}
            </li>
            <li>
              <strong>Phone:</strong> {address.phoneNumber}
            </li>
            <li>
              <strong>Country:</strong> {address.country}
            </li>
            <li>
              <strong>State:</strong> {address.state}
            </li>
            <li>
              <strong>City:</strong> {address.city}
            </li>
            <li>
              <strong>Pin Code:</strong> {address.pincode}
            </li>
            <li>
              <strong>Address:</strong> {address.address}
            </li>
          </ul>
        ) : (
          <span>No address found</span>
        )}
      </td>
    </>
  );
};
export default OldAddress;
