import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../Redux/Feature/Checkoutslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // lowercase 'navigate'
  const { status, error } = useSelector((state) => state.checkout);

  const [formdata, setFormdata] = useState({
    fullname: "",
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      await dispatch(checkout({ addressData: formdata, token }));
      toast.success("Address added successfully");

      
      navigate("/checkout", { state: { address: formdata } });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="row border-orange">
      <div>
        <h2 className="col-3-md-4 lg-5 text-center">Shipping Address</h2>
        <div className="container">
          <form className="my-3" onSubmit={submitHandle}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              value={formdata.fullname}
              onChange={handlechange}
              required
            />
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              className="form-control"
              value={formdata.country}
              onChange={handlechange}
              required
            />
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formdata.state}
              onChange={handlechange}
              required
            />
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formdata.city}
              onChange={handlechange}
              required
            />
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={formdata.pincode}
              onChange={handlechange}
              required
            />
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={formdata.phoneNumber}
              onChange={handlechange}
              required
            />
            <label className="form-label">Address/Nearby</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formdata.address}
              onChange={handlechange}
              required
            />

            <button className="btn btn-danger mt-3" type="submit">
              {status === "loading" ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="btn btn-warning mt-2"
            >
              Use Old Address
            </button>
          </form>
          {error && <p className="text-danger">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Address;
