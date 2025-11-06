import React from "react";
import { ScrollRestoration } from "react-router-dom";
import AdminPanel from "../admin/AdminPannel";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ScrollRestoration />
      {/* Admin Panel jisme Sidebar + Header + Footer + Outlet hoga */}
      <AdminPanel />
    </div>
  );
};

export default AdminLayout;
