import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/Feature/productslice";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    imageSrc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const resultAction = await dispatch(
        createProduct({ ...formData, token })
      );
      if (createProduct.fulfilled.match(resultAction)) {
        toast.success("Product created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          imageSrc: "",
        });
      } else {
        toast.error(resultAction.payload || "Something went wrong");
      }
    } catch (err) {
      toast.error("Error creating product");
    }
  };

  return (
    <div className="container-sm mt-5">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">Create New Product</h3>
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
            <textarea
              className="form-control"
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
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
              type="text"
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
              placeholder="Image URL"
              value={formData.imageSrc}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
