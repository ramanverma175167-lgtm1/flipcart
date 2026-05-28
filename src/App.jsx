import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import FeaturesSection from "./components/FeaturesSection";
import ProductDetails from "./components/ProductDetails";
import Address from "./components/logincustomer/Address";
import OrderSummaryDetails from "./components/OrderDetailsSummary";
import PaymentDetails from "./components/PaymentPage";
import Headersec from "./components/Headersecond";
import Myaccount from "./components/Myaccount"
import Cart from "./components/Cart"
import SearchPage from "./components/SearchPage"
import Login from "./components/logincustomer/Login"
import SignUp from "./components/logincustomer/Signup"
import ForgotPassword from "./components/logincustomer/ForgotPassword"
import VerifyOtp from "./components/logincustomer/VerifyOtp"
import ResetPassword from "./components/logincustomer/ResetPassword"
import Account from "./components/logincustomer/Account"
import Gateway from "./components/GatewayPage"

import Footer from "./components/Footer";

// Pages


// Admin panel
import AdminPanelLogin from "./components/AdminPanel/AdminPanelLogin";
import AdminLayout from "./components/AdminPanel/AdminLayout";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import TotalUsers from "./components/AdminPanel/Totalusers";
import Addproducts from "./components/AdminPanel//AddProducts"
import PurchasedItems from "./components/AdminPanel/Purchaseditems";
import Productview from "./components/AdminPanel/ProductView"


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
        <Route
          path="/cart"
          element={
            <>
              <Headersec />
              <Cart />
            </>
          }
        />
        <Route
          path="/gateway"
          element={
            <>
              <Headersec />
              <Gateway />
            </>
          }
        />
        
        <Route
          path="/payment"
          element={
            <>
              <Headersec />
              <PaymentDetails  />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/search"
          element={
            <>
              <Headersec />
              <SearchPage />

            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <Headersec />
              <Account />

            </>
          }
        />
        <Route
          path="/account/:id/address"
          element={
            <>
              <Headersec />
              <Address />
            </>
          }
        />

        <Route
          path="/address"
          element={
            <>
              <Headersec />
              <Address />

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
          path="/Login"
          element={
            <>
              <Headersec />
              <Login />
            </>
          }
        />
        <Route
          path="/Signup"
          element={
            <>
              <Headersec />
              <SignUp />
            </>
          }
        />



        <Route
          path="/product-details/:id"
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
              <OrderSummaryDetails />

            </>
          }
        />
        <Route path="/order-summary/:id" element={<OrderSummaryDetails />} />


        <Route
          path="/Login3"
          element={
            <>
              <Headersec />
              <Login />

            </>
          }
        />
        <Route
          path="/Login"
          element={
            <>
              <Headersec />
              <Myaccount />

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
          <Route
            index
            element={<AdminPanel />}
          />
          <Route
            path="users"
            element={<TotalUsers />}
          />
          <Route
            path="add-product"
            element={<Addproducts />}
          />
          <Route
            path="orders"
            element={<PurchasedItems />}
          />
          <Route
            path="product-view"
            element={<Productview />}
          />

          {/* <Route path="cards" element={<UsersCards />} /> */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
