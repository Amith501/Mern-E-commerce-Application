import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"; //  Added useLocation
import { logout } from "../Redux/Feature/authapi";
import { toast } from "react-toastify";
import { resetCart } from "../Redux/Feature/cartslice";
const Navbar = () => {
  const [searchterm, setSearchterm] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); //  Get current page

  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchterm.trim()) {
      toast.warning("Please enter a search term!"); //  Prevent empty search
      return;
    }
    console.log("Searching for:", searchterm); // Debugging search term
    navigate(`/product/search/${searchterm.trim()}`);
  };

  // Logout Handler with Toast
  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetCart());
    toast.success("Logout sucessfully ");
    navigate("/login");
  };
  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  // Function to Highlight Active Page
  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold">
          E-Commerce
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search Bar */}
          <form
            className="d-flex mx-auto my-2 my-lg-0 w-50"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
            />
            <button className="btn btn-outline-primary ms-2" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {/* Authentication & User Links */}
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <span className="mx-2">Welcome, {user?.name || "User"}!</span>
                <Link
                  to="/profile"
                  className={`btn btn-info mx-2 ${isActive("/profile")}`}
                >
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <button onClick={handleLogout} className="btn btn-warning mx-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`btn btn-warning mx-2 ${isActive("/login")}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`btn btn-primary mx-2 ${isActive("/register")}`}
                >
                  Register
                </Link>
              </>
            )}

            {/* 
<li><NavLink to="/cart" className='bg-primary p-2 rounded text-white text-decoration-none position-relative border-0'>Bag
<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart}</span> */}

            {/* Cart Button */}
            <Link to="/cart">
              <button className={`btn btn-danger mx-2 ${isActive("/cart")}`}>
                <FontAwesomeIcon icon={faCartShopping} /> Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"></span>
              </button>
            </Link>

            {/* Admin Dashboard (only for admin users) */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin"
                className={`btn btn-success mx-2 ${isActive("/admin")}`}
              >
                <FontAwesomeIcon icon={faLock} /> Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
