import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import logo from '../assets/logo.webp'; // Adjust the path based on your file structure

import {
  faSignInAlt,
  faUserPlus,
  faUser,
  faXmark,
  faHome,
  faHeart,
  faPlusCircle,
  faList,
  faBoxOpen,
  faHandshake,
  faRightFromBracket,
  faFilter,
  faSort
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priceRange: { min: 0, max: 10000 }
  });

  const navigate = useNavigate();

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://x-found-backend.onrender.com/api/items`, {
        params: { 
          college: selectedCollege !== "All Colleges" ? selectedCollege : undefined 
        }
      });
      const fetchedItems = Array.isArray(response.data) ? response.data : [];
      setItems(fetchedItems);
      applyFiltersAndSort(fetchedItems);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to load items. Please try again later.");
      setLoading(false);
      setItems([]);
      setDisplayItems([]);
    }
  }, [selectedCollege]);

  const applyFiltersAndSort = useCallback((itemsToFilter) => {
    let filteredItems = itemsToFilter.filter(item => 
      (filters.category ? item.category === filters.category : true) &&
      (filters.status ? item.status === filters.status : true) &&
      (item.price >= filters.priceRange.min && item.price <= filters.priceRange.max) &&
      (searchTerm.trim() === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Sorting
    switch(sortOption) {
      case "newest":
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "priceAsc":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setDisplayItems(filteredItems);
  }, [filters, searchTerm, sortOption]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (parsedUser.college) {
          setSelectedCollege(parsedUser.college);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }

    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    applyFiltersAndSort(items);
  }, [filters, searchTerm, sortOption, items, applyFiltersAndSort]);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/LoginForm", { replace: true });
  }

  function toggleFilterModal() {
    setFilterModalOpen(!filterModalOpen);
  }

  const renderSidebar = () => (
    <div className={`slidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="top">
        <div className="user-profile">
          <FontAwesomeIcon icon={faUser} size="2x" color="white" />
          <span className="user-greeting">
            {user ? `Hello, ${user.username}` : "Hello Guest"}
          </span>
        </div>
        <FontAwesomeIcon
          className="close"
          icon={faXmark}
          size="2x"
          color="white"
          onClick={toggleSidebar}
        />
      </div>

      <div className="sidebar-menu">
        {user ? (
          <>
            <Link to="/" className="sidebar-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/UserItemsList" className="sidebar-link">
              <FontAwesomeIcon icon={faList} /> My Listings
            </Link>
            <Link to="/PostItem" className="sidebar-link">
              <FontAwesomeIcon icon={faPlusCircle} /> Post New Item
            </Link>
            <Link to="/AboutUs" className="sidebar-link">
              <FontAwesomeIcon icon={faBoxOpen} /> About Us
            </Link>
            <Link to="/Rules" className="sidebar-link">
              <FontAwesomeIcon icon={faHandshake} /> Rules & Regulations
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/LoginForm" className="sidebar-link auth-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link to="/SignupForm" className="sidebar-link auth-link">
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const renderFilterModal = () => (
    filterModalOpen && (
      <div className="filter-modal" onClick={toggleFilterModal}>
        <div 
          className="filter-content" 
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Filter Items</h3>
          <div className="filter-section">
            <label>Category</label>
            <select 
              value={filters.category} 
              onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          
          <div className="filter-section">
            <label>Status</label>
            <select 
              value={filters.status} 
              onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Exchange">Exchange</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          
          <div className="filter-section">
            <label>Price Range</label>
            <div className="price-range">
              <input 
                type="number" 
                placeholder="Min" 
                value={filters.priceRange.min}
                onChange={(e) => setFilters(prev => ({
                  ...prev, 
                  priceRange: {...prev.priceRange, min: Number(e.target.value)}
                }))}
              />
              <input 
                type="number" 
                placeholder="Max" 
                value={filters.priceRange.max}
                onChange={(e) => setFilters(prev => ({
                  ...prev, 
                  priceRange: {...prev.priceRange, max: Number(e.target.value)}
                }))}
              />
            </div>
          </div>
          
          <div className="filter-actions">
            <button onClick={toggleFilterModal}>Apply</button>
            <button onClick={() => {
              setFilters({
                category: "",
                status: "",
                priceRange: { min: 0, max: 10000 }
              });
              toggleFilterModal();
            }}>Reset</button>
          </div>
        </div>
      </div>
    )
  );

  const renderHeader = () => (
    <header className="header">
      <div className="Logo-ham">
        <div onClick={toggleSidebar} className="hamburger-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>

        <div className="logo">
      <img src={logo} alt="logo" className="logo-img" />
    </div>
      </div>

      <form className="search-bar" onSubmit={(e) => {
        e.preventDefault();
        applyFiltersAndSort(items);
      }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value.trim() === "") {
              setDisplayItems(items);
            }
          }}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="header-controls">
        <button onClick={toggleFilterModal} className="filter-btn">
          <FontAwesomeIcon icon={faFilter} /> Filters
        </button>
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      <div className="auth-buttons">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/LoginForm" className="btn">
              Login
            </Link>
            /
            <Link to="/SignupForm" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );

  const renderItemGrid = () => (
    <div className="home-container">
      {loading ? (
        <div className="loading-message">Loading items...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="items-grid">
          {displayItems.length > 0 ? (
            displayItems.map((item) => (
              <div 
                key={item._id} 
                className="item-card"
                onClick={() => navigate(`/item/${item._id}`)}
              >
                <img
                  src={item.imageUrl || "/default-item-image.png"}
                  alt={item.name || "Item Image"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-item-image.png";
                  }}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </p>
                  <div className="item-info">
                    <span className="item-category">
                      Category: {item.category}
                    </span>
                    <span
                      className={`item-status status-${item.status.toLowerCase()}`}
                    >
                      Status: {item.status}
                    </span>
                  </div>
                  <div className="item-footer">
                    <span className="item-location">
                      {item.collegeName}
                    </span>
                    {item.status === "Exchange" && (
                      <span className="item-price">₹{item.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-items">
              No items found matching your search
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {renderSidebar()}
      {renderFilterModal()}
      {renderHeader()}
      {renderItemGrid()}
    </>
  );
}

export default Home;