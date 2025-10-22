import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../Redux/Feature/productslice";
import { useNavigate } from "react-router-dom"; // ✅ import this

const ProductsList = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize navigate

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct({ id, token }));
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Products</h2>
      <table className="table table-bordered table-striped table-dark">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id}>
                <th scope="row">{index + 1}</th>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={product.imageSrc}
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/edit/${product._id}`)} //  Edit route
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
