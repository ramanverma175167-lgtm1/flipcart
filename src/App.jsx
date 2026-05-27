import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import FeaturesSection from "./components/FeaturesSection";
import ProductDetails from "./components/ProductDetails";
import Ordersummary from "./components/OrderSummary";
import OrderSummaryDetails from "./components/OrderDetailsSummary";
import PaymentDetails from "./components/PaymentPage";
import Headersec from "./components/Headersecond";
import Login from "./components/Login"
import Myaccount from "./components/Myaccount"
import Cart from "./components/Cart"
import SearchPage from "./components/SearchPage"


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
  path="/search"
  element={
    <>
    <Headersec />
      <SearchPage />
    
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
