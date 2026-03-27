import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout({ userId }) {
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, { withCredentials: true });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOrder = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/order/checkout/${userId}`,
        { shippingAddress: shipping, paymentMethod },
        { withCredentials: true }
      );
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error placing order");
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["fullName", "address", "city", "state", "zipCode", "phone"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shipping[field]}
                onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#8b1d41] outline-none"
              />
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="border rounded-lg p-4 space-y-2">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2 border-t pt-2">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#8b1d41] outline-none"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Card Payment</option>
          </select>
        </div>

        <button
          onClick={handleOrder}
          className="w-full py-3 bg-[#003848] text-white font-bold rounded-lg hover:bg-[#002233] transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}