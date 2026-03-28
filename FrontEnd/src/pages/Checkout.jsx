import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Truck, CreditCard, ShieldCheck, ChevronLeft } from "lucide-react"; // Optional: Install lucide-react

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = "http://localhost:5000/api";

  const checkLogin = async () => {
    try {
      await axios.get(`${API}/user/me`, { withCredentials: true });
    } catch {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, { withCredentials: true });
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Fetch Cart Error:", err);
    }
  };

  useEffect(() => {
    checkLogin();
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { name, phone, address, city, pincode } = form;
    return (
      name.trim() &&
      phone.trim().length >= 10 &&
      address.trim() &&
      city.trim() &&
      pincode.trim().length === 6
    );
  };

  const handleOrder = async () => {
    if (!isFormValid()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/order/place`, form, { withCredentials: true });
      navigate("/order-success"); // Consider a dedicated success page
    } catch (err) {
      alert("❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-black transition"
          >
            <ChevronLeft size={20} />
            <span className="ml-1 font-medium">Back to Cart</span>
          </button>
          <div className="flex items-center gap-2 text-green-600">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Shipping Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      name="pincode"
                      placeholder="6 digits"
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      value={form.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    rows="3"
                    placeholder="House No, Street, Area..."
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    name="city"
                    placeholder="City Name"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
               <CreditCard className="text-blue-600 mt-1" size={20} />
               <div>
                 <p className="font-semibold text-blue-900">Payment Method</p>
                 <p className="text-sm text-blue-700">Cash on Delivery (COD) selected. Pay when you receive your package.</p>
               </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <ShoppingBag size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              </div>

              <div className="max-h-[400px] overflow-y-auto mb-6 pr-2">
                {cart.length === 0 ? (
                  <p className="text-gray-500 py-4">Your cart is feeling a bit light...</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{item.product?.name}</span>
                        <span className="text-sm text-gray-500 italic text-[14px]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-black text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={!isFormValid() || cart.length === 0 || loading}
                className={`w-full py-4 mt-8 rounded-2xl text-white font-bold text-lg transition-all transform active:scale-[0.98] ${
                  !isFormValid() || cart.length === 0 || loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-black shadow-lg shadow-gray-200"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By clicking Confirm Order, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;