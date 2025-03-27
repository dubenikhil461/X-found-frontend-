  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "./PostItem.css";

  function PostItem() {
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      price: "",
      category: "",
      status: "Lost",
      location: "",
      collegeName: "SECT",
    });
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Create FormData object
      const formDataToSubmit = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      // Append image
      if (image) {
        formDataToSubmit.append("image", image);
      }

      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.post(
          "https://x-found-backend.onrender.com/api/items",
          formDataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Item posted successfully:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error posting item:", error);
      }
    };

    const handleBack = () => {
      navigate("/");
    };

    return (
      <div className="post-item-container">
        <button className="back-btn" onClick={handleBack}>
          Back to Home
        </button>
        <h2 className="post-item-title">Post a New Item</h2>

        <form onSubmit={handleSubmit} className="post-item-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {formData.status === "Exchange" ? (
                <>
                  <label className="form-label">Price</label>
                  <input
                    className="form-input"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </>
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                className="form-input"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                className="form-input"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            <input
              className="form-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="collegeName">Select Your College</label>
            <select
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange} // Ensure it updates state
            >
              <option value="SECT">SECT</option>
              <option value="LTCE">LTCE</option>
              <option value="VJTI">VJTI</option>
              <option value="IITB">IITB</option>
              <option value="SPIT">SPIT</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
              <option value="Exchange">Exchange</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Post Item
          </button>
        </form>
      </div>
    );
  }

  export default PostItem;
