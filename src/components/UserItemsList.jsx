import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userlist.css"; // Import the CSS file

function UserItemList() {
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserItems();
  }, []);

  const fetchUserItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch the current user's ID from the token (you'll need to implement this)
      const userId = getUserIdFromToken(token);

      const response = await axios.get(
        `https://x-found-backend.onrender.com/api/items/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user items:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Utility function to decode JWT and get user ID
  const getUserIdFromToken = (token) => {
    try {
      // This assumes you're using a JWT with a standard payload
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const payload = JSON.parse(window.atob(base64));
      return payload.id; // Adjust this based on how your token is structured
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Invalid token");
    }
  };
  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        console.log("Attempting to delete item:", itemId); // Add logging
        console.log("Token:", token); // Verify token is present

        const response = await axios.delete(
          `https://x-found-backend.onrender.com/api/items/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Delete response:", response); // Log the response

        // Remove the deleted item from the state
        setUserItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      } catch (error) {
        console.error("Full error details:", error);
        console.error(
          "Error deleting item:",
          error.response?.data || error.message
        );
        alert("Failed to delete item. Please try again.");
      }
    }
  };
  const handleEditItem = (itemId) => {
    // Navigate to edit page with the specific item ID
    navigate(`/EditItemPage/${itemId}`);
  };

  if (isLoading) {
    return <div className="user-items-loading">Loading your items...</div>;
  }

  if (error) {
    return <div className="user-items-error">Error: {error}</div>;
  }

  return (
    <div className="user-items-container">
      <h2 className="user-items-title">Your Posted Items</h2>

      {userItems.length === 0 ? (
        <div className="user-items-empty-state">
          You haven't posted any items yet.
        </div>
      ) : (
        <div className="user-items-grid">
          {userItems.map((item) => (
            <div key={item._id} className="user-item-card">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="user-item-image"
                />
              )}

              <div className="user-item-content">
                <h3 className="user-item-name">{item.name}</h3>
                <p className="user-item-description">{item.description}</p>

                <div className="user-item-details">
                  <div>
                    <span className="user-item-status">{item.status}</span>
                    <span className="user-item-location"> {item.location}</span>
                  </div>

                  <div className="user-item-actions">
                    <button
                      onClick={() => handleEditItem(item._id)}
                      className="user-item-edit-btn"
                      title="Edit Item"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="user-item-delete-btn"
                      title="Delete Item"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="user-item-delete-btn"
                      title="Delete Item"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserItemList;
