// pages/Admin/AdminLogin.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/admin/login",
        form,
        { withCredentials: true }
      );
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#003848] to-[#8b1d41] p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-[#003848] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#003848] text-white font-semibold rounded-lg hover:bg-[#002233] transition-all duration-300 mt-2"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Not an admin?{" "}
          <span
            className="text-[#8b1d41] font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/admin/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}