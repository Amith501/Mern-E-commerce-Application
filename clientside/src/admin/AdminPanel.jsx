import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {user?.name}</p>

      <ul>
        <li>
          <Link to="/users">
            <button>Manage Users</button>
          </Link>
        </li>
        <li>
          <Link to="/admin/fetch-all">
            <button>Manage Products</button>
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">
            <button>Manage Orders</button>
          </Link>
        </li>
        <li>
          <Link to="/admin/create-product">
            <button>Create Product</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPanel;
