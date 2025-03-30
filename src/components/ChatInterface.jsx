import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./chat.css"

function ChatInterface({ itemId, currentUser, otherUser }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser || !otherUser || !itemId) {
      setError("Missing required chat parameters");
      return;
    }

    // Initialize socket connection
    const newSocket = io("https://x-found-backend.onrender.com", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    setSocket(newSocket);

    // Register current user
    newSocket.emit("register", currentUser._id);

    // Fetch or create chat
    const initializeChat = async () => {
      try {
        // Debugging checks
        const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser || !storedUser.token) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const response = await axios.post(
      "http://localhost:8000/api/chats",
      {
        itemId,
        participants: [currentUser._id, otherUser._id],
      },
      {
        headers: { 
          Authorization: `Bearer ${storedUser.token}`, 
          'Content-Type': 'application/json'
        }, 
      }
    );
        
        console.log("Chat initialized:", response.data);
        setChatId(response.data._id);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Chat initialization error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          switch (error.response.status) {
            case 401:
              setError("Authentication failed. Please log in again.");
              break;
            case 403:
              setError("You do not have permission to access this chat.");
              break;
            case 404:
              setError("Chat endpoint not found.");
              break;
            default:
              setError("An error occurred while initializing the chat.");
          }
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response from server. Please check your network connection.");
        } else {
          // Something happened in setting up the request
          setError("Error setting up chat request.");
        }
      }
    };
    

    initializeChat();

    // Listen for incoming messages
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    newSocket.on("receive_message", handleReceiveMessage);

    // Socket connection error handling
    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error", err);
      setError("Could not connect to chat server");
    });

    return () => {
      newSocket.off("receive_message", handleReceiveMessage);
      newSocket.close();
    };
  }, [itemId, currentUser, otherUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !chatId) {
      return;
    }

    try {
      socket.emit("send_message", {
        chatId,
        senderId: currentUser._id,
        recipientId: otherUser._id,
        content: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Message send error", error);
      setError("Could not send message");
    }
  };

  if (error) {
    return <div className="chat-error">{error}</div>;
  }

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === currentUser._id ? "sent" : "received"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!chatId}
        />
        <button 
          onClick={sendMessage} 
          disabled={!newMessage.trim() || !chatId}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;