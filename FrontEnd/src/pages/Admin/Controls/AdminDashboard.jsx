import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdCategory, MdProductionQuantityLimits, MdPeople, MdShoppingCart } from "react-icons/md";
import axios from "axios";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-lg transition-colors ${
      isActive ? "bg-[#003848] text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  // ================= FETCH ADMIN INFO =================
  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/me", {
        withCredentials: true,
      });
      setAdminName(res.data.name);
    } catch {
      navigate("/admin/login"); // redirect if not logged in
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        { withCredentials: true }
      );
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#003848]">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <MdCategory size={20} /> Dashboard
          </NavLink>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-700">Hello, {adminName || "Admin"}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;