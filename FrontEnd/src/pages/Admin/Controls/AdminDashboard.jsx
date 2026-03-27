import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdCategory, MdProductionQuantityLimits, MdPeople, MdShoppingCart } from "react-icons/md";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-lg transition-colors ${
      isActive ? "bg-[#003848] text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#003848]">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/category" className={linkClass}>
            <MdCategory size={20} /> Category
          </NavLink>
          <NavLink to="/admin/product" className={linkClass}>
            <MdProductionQuantityLimits size={20} /> Product
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <MdPeople size={20} /> Users
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            <MdShoppingCart size={20} /> Orders
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;