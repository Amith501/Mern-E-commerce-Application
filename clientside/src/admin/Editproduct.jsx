import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../Redux/Feature/productslice";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams(); // Correctly extract the ID from useParams
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const token = useSelector((state) => state.auth.token); // Assuming you're storing the token in the state

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    imageSrc: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); // Fetch product data on component mount
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        quantity: product.quantity || "",
        imageSrc: product.imageSrc || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const result = await dispatch(
        updateProduct({ id, data: formData, token })
      );
      if (updateProduct.fulfilled.match(result)) {
        toast.success("Product updated successfully");
      } else {
        toast.error(result.payload || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  return (
    <div className="container-sm mt-5">
      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="Product Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="category"
              placeholder="Product Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              name="quantity"
              placeholder="Product Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="imageSrc"
              placeholder="Product Image URL"
              value={formData.imageSrc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
