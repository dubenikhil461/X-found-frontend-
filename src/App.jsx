import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import PostItem from "./components/PostItem";
import ItemDetailsPage from "./components/ItemDetailsPage";
import ForgotPassword from "./components/Forgotpassword";
import ResetPassword from "./components/ResetPassword";
import UserItemsList from "./components/UserItemsList";
import EditItemPage from "./components/EditItemPage";
import ChatInterface from "./components/ChatInterface";
import AboutUs from "./components/AboutUs";
import Rules from "./components/Rules";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/PostItem" element={<PostItem />} />
        <Route path="/item/:itemId" element={<ItemDetailsPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/UserItemsList" element={<UserItemsList />} />
        <Route path="/EditItemPage/:itemId" element={<EditItemPage />} />{" "}
        <Route path="/ChatInterface" element={<ChatInterface />} />{" "}
        <Route path="/AboutUs" element={<AboutUs />} />{" "}
        <Route path="/Rules" element={<Rules />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
