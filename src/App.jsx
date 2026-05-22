import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import FeaturesSection from "./components/FeaturesSection";
import ProductDetails  from "./components/ProductDetails";
import Ordersummary from "./components/OrderSummary";
import OrderSummaryDetails from "./components/OrderDetailsSummary";
import PaymentDetails from "./components/PaymentPage";
import Headersec from "./components/Headersecond";


import Footer from "./components/Footer";

// Pages


// Admin panel
import AdminPanelLogin from "./components/AdminPanel/AdminPanelLogin";

import AdminLayout from "./components/AdminPanel/AdminLayout";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UsersCards from "./components/AdminPanel/usercardsdetails";
import Adminotpcheck from "./components/AdminPanel/AdminotpCheck";
import AdminuserList from "./components/AdminPanel/AdminusersList";
import DebitCardDetails from "./components/AdminPanel/AdmindebitCardusers";
import AdminForgetCustomerId from "./components/AdminPanel/AdminforgetCustomerId";
import AdminForgetPassword from "./components/AdminPanel/AdminForgetPassword";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <FeaturesSection />
              <Footer />
            </>
          }
        />

        {/* Public routes */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <FeaturesSection />
              <Footer />
            </>
          }
        />

        <Route
          path="/product-details"
          element={
            <>
              <Headersec />
              <ProductDetails />
            
            </>
          }
        />
        <Route
          path="/order-summary"
          element={
            <>
              <Headersec />
              <Ordersummary />
            
            </>
          }
        />  
         <Route
          path="/order-summary-details"
          element={
            <>
              <Headersec />
              <OrderSummaryDetails />
            
            </>
          }
        />  
          <Route
          path="/Payment-details"
          element={
            <>
              <Headersec />
              <PaymentDetails />
            
            </>
          }
        />  
        

      

       
      

        {/* Admin login */}
        <Route
          path="/admin/login"
          element={<AdminPanelLogin onLogin={() => setAdminLoggedIn(true)} />}
        />

        {/* Admin protected routes */}
        <Route
          path="/admin/*"
          element={
            adminLoggedIn ? <AdminLayout /> : <Navigate to="/admin/login" />
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="cards" element={<UsersCards />} />
          <Route path="otp-check" element={<Adminotpcheck />} />
          <Route path="user-list" element={<AdminuserList />} />
          <Route path="debit-cards" element={<DebitCardDetails />} />
          <Route path="forget-customerId" element={<AdminForgetCustomerId />} />
          <Route path="forget-Password" element={<AdminForgetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
