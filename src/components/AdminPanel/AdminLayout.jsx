import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="admin-content">
      </div>
    </div>
  );
}
