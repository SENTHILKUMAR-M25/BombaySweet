import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/order";

const OrdersControl = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/all`, { withCredentials: true });
      setOrders(res.data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      alert(err.response?.data?.msg || "Failed to fetch orders");
      setLoading(false);
    }
  };

  // ================= DELETE ORDER =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
      alert(res.data.msg); // Show success message
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert(err.response?.data?.msg || "Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border-b">S.No</th>
                <th className="p-3 border-b">Order ID</th>
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Total Amount</th>
                <th className="p-3 border-b">Items</th>
                <th className="p-3 border-b">Shipping Address</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{order._id}</td>
                  <td className="p-3 border-b">
                    {order.user?.name || "N/A"}
                    <br />
                    <span className="text-xs text-gray-500">{order.user?.email || ""}</span>
                  </td>
                  <td className="p-3 border-b">₹{order.totalAmount}</td>
                  <td className="p-3 border-b">
                    {order.items.map((item, idx) => (
                      <div key={`${item.product}-${idx}`}>
                        {item.name} x {item.quantity} = ₹{item.total}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border-b">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.state || ""} - ${order.shippingAddress.pincode || ""}`
                      : "N/A"}
                  </td>
                  <td className="p-3 border-b space-x-2">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersControl;