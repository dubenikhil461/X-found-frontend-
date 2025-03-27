import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ItemDetailsPage.css";
import ChatInterface from "./ChatInterface"; // Import ChatInterface

function ItemDetailsPage() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { itemId } = useParams();

  // Get user data from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Fetch item details
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.get(
          `https://x-found-backend.onrender.com/api/items/${itemId}`,
          { headers, timeout: 5000 }
        );

        setItem(response.data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to load item details";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  // Handler for opening chat
  const handleChatWithOwner = () => {
    setShowChat(true);
  };

  // Handler for closing chat
  const handleCloseChat = () => {
    setShowChat(false);
  };

  if (loading)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading item details...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-state">
        <h3>Error Loading Item</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );

  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="item-details-container">
      <Link to="/">Go Back</Link>
      <div className="item-details-section">
        <div className="item-image-container">
          <img
            src={item.imageUrl || "/default-image.png"}
            alt={item.name}
            className="item-details-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-image.png";
            }}
          />
        </div>

        <div className="item-info-section">
          <h1 className="item-name">{item.name}</h1>

          <div className="item-details-grid">
            <DetailCard
              title="Description"
              style={{ textAlign: "justify" }}
              content={item.description}
            />
            <DetailCard title="Category" content={item.category} />
            <DetailCard
              title="Status"
              content={item.status}
              specialClass={`status-${item.status.toLowerCase()}`}
            />

            {item.status === "Exchange" && (
              <DetailCard
                title="Price"
                content={`₹${item.price}`}
                specialClass="price"
              />
            )}

            <DetailCard title="Location" content={item.location} />
            <DetailCard title="College" content={item.collegeName} />
          </div>

          {/* Chat with Owner Button */}
          {user && user._id !== item.owner && (
            <button
              onClick={handleChatWithOwner}
              className="chat-with-owner-btn"
            >
              Chat with Owner
            </button>
          )}
        </div>
      </div>

      {/* Chat Interface Modal */}
      {showChat && (
        <div className="chat-modal">
          <div className="chat-modal-content">
            <button onClick={handleCloseChat} className="close-chat-btn">
              Close Chat
            </button>
            <ChatInterface
              itemId={itemId}
              currentUser={user}
              otherUser={{ _id: item.owner }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Detail Card Component
function DetailCard({ title, content, specialClass = "" }) {
  return (
    <div className={`detail-item ${specialClass}`}>
      <strong>{title}:</strong>
      <p>{content}</p>
    </div>
  );
}

export default ItemDetailsPage;
