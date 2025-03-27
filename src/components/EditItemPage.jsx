import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edititem.css"; // Create a CSS file for styling

function EditItemPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
    imageUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `https://x-found-backend.onrender.com/api/items/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setItem(response.data);
        setImagePreview(response.data.imageUrl);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching item details:", error);
        setError(
          error.response?.data?.message || "Failed to fetch item details"
        );
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://x-found-backend.onrender.com/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadedImageUrl = response.data.imageUrl;
        setItem((prevItem) => ({
          ...prevItem,
          imageUrl: uploadedImageUrl,
        }));
        setImagePreview(uploadedImageUrl);
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Failed to upload image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Validate required fields
      if (!item.name || !item.description) {
        alert("Please fill in all required fields");
        return;
      }

      await axios.put(`https://x-found-backend.onrender.com/api/items/${itemId}`, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Navigate back to the user's item list after successful update
      navigate(`/UserItemsList`);
    } catch (error) {
      console.error("Error updating item:", error);
      setError(error.response?.data?.message || "Failed to update item");
    }
  };

  const handleCancel = () => {
    navigate("/UserItemsList");
  };

  if (isLoading)
    return (
      <div className="edit-item-loading">
        <p>Loading item details...</p>
      </div>
    );

  if (error)
    return (
      <div className="edit-item-error">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="edit-item-container">
      <h2 className="edit-item-title">Edit Item</h2>
      <form onSubmit={handleSubmit} className="edit-item-form">
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            type="text"
            value={item.name || ""}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={item.description || ""}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            placeholder="Describe your item"
            required
          />
        </div>
        {/* 
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={item.status || ""}
            onChange={(e) => setItem({ ...item, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Pending">Pending</option>
          </select>
        </div> */}

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={item.location || ""}
            onChange={(e) => setItem({ ...item, location: e.target.value })}
            placeholder="Enter item location"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="image">Item Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          /> */}
          {imagePreview && (
            <div className="image-preview">
              <img
                src={imagePreview}
                alt="Item Preview"
                className="preview-image"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-update">
            Update Item
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditItemPage;
