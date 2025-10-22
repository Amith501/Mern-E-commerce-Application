import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/Feature/authapi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth); // ✅ Get user from Redux state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [localError, setLocalError] = useState(""); // Handle local form errors

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      setLocalError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmpassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap(); // ✅ Ensure the action resolves properly
    } catch (err) {
      setLocalError(err || "Registration failed.");
    }
  };

  //  Redirect to login if registration is successful
  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div
      className="container my-5 p-4"
      style={{
        maxWidth: "600px",
        border: "2px solid blue",
        borderRadius: "10px",
      }}
    >
      <h2 className="text-center">User Register</h2>

      {localError && <p className="text-danger text-center">{localError}</p>}
      {/* {error && <p className="text-danger text-center">{error}</p>} */}

      <form onSubmit={submitHandler} className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            type="text"
            className="form-control"
            id="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            className="form-control"
            id="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={onChangeHandler}
            type="password"
            className="form-control"
            id="confirmpassword"
            required
          />
        </div>

        <div className="d-grid col-md-6 col-12 mx-auto my-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
