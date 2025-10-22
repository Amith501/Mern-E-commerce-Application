import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Feature/authapi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [customError, setCustomError] = useState("");

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setCustomError("");

    if (!formData.email || !formData.password) {
      setCustomError("Both fields are required.");
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      setCustomError(err || "Login failed. Please try again.");
    }
  };

  // Redirect user after successful login if token exists
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className=" max-w-600 container max-width: 100% my-5  border 2solipx d blue custom-m ">
      <h2 className="text-center">User Login</h2>

      {customError && <p className="text-danger text-center">{customError}</p>}
      {/* {error && <p className="text-danger text-center">{error}</p>} */}

      <form onSubmit={submitHandler} className="my-3">
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

        <div className="d-grid col-md-6 col-12 mx-auto my-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
