import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [orderGraphData, setOrderGraphData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#FF6384"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", { withCredentials: true });
        setStats(res.data);
        setCategoryData(res.data.categories || []);
        setOrderGraphData(res.data.orderGraph || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const formatRevenue = (num) => num.toLocaleString("en-IN");

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["Users", "Products", "Orders", "Revenue"].map((title, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">{title}</h3>
              <p className="text-2xl font-bold">
                {title === "Revenue" ? `₹${formatRevenue(stats.revenue)}` : stats[title.toLowerCase()]}
              </p>
            </div>
          ))}
        </div>
<div className="sm:block md:grid grid-cols-2 gap-3 ">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Category Distribution (Sold Items)</h2>
          {categoryData.length === 0 ? (
            <p className="text-gray-500">No sales data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry._id} (${entry.value})`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} items`, "Sold"]} cursor={{ fill: "rgba(0,0,0,0.1)" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Orders & Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Orders & Revenue Graph</h2>
          {orderGraphData.length === 0 ? (
            <p className="text-gray-500">No order data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderGraphData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => typeof value === "number" ? value.toLocaleString("en-IN") : value} />
                <Legend />
                <Bar dataKey="orders" fill="#0088FE" name="Orders" />
                <Bar dataKey="revenue" fill="#00C49F" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;