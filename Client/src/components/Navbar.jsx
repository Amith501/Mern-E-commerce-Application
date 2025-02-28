import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navleft">
          <h3>E-commerce</h3>
          <div className="navsearch">
            <input type="search" placeholder="Search for products" />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <div className="navitems">
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faCartShopping} />
              Cart
            </button>
            <button className="btn btn-info">
              <FontAwesomeIcon icon={faUser} />
              Profile
            </button>
            <button className="btn btn-warning">Login</button>
            <button className="btn btn-primary">Signup</button>
            <button className="btn btn-success">
              <FontAwesomeIcon icon={faLock} />
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
