import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeLanding from "./pages/HomeLanding";
import MyListings from "./pages/MyListings";
import SwapRequests from "./pages/SwapRequests";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDesign from "./pages/ProductDesign";
import Footer from "./components/Footer";
import BrowseItems from "./pages/BrowseItems";

// ⚡ STEP 1: Wrap the interior layout inside a sub-component so useLocation handles memory inside the <Router> context cleanly
function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route path="/swap-requests" element={<SwapRequests />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product-design" element={<ProductDesign />} />
      </Routes>
      {shouldShowNavbar && <Footer />}
    </>
  );
}

// ⚡ STEP 2: The root App component mounts the top-level <Router> wrapper safely around MainLayout
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
