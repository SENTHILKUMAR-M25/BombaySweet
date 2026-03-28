import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [overLimit, setOverLimit] = useState(false); // check if any item exceeds stock
  const navigate = useNavigate();

  // ================= CHECK LOGIN =================
  const checkLogin = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/me", {
        withCredentials: true,
      });
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        withCredentials: true,
      });

      const items = res.data.cart || [];
      const over = items.some((item) => item.quantity > item.product.stock);
      setOverLimit(over);
      setCartItems(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkLogin();
    fetchCart();
  }, []);
  const addQuantity = (item) => {
    const newQty = item.quantity + 1;

    if (newQty > item.product.stock) {
      alert("⚠️ You have added more than available stock. Reduce quantity.");
      return;
    }

    handleQuantity(item._id, newQty);
  };
  // ================= UPDATE QUANTITY =================
  const handleQuantity = async (id, qty) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    // Prevent exceeding stock
    if (qty > item.product.stock) {
      alert("⚠️ You have added more than available stock. Reduce quantity.");
      return;
    }
    if (qty < 1) return;

    await axios.put(
      `http://localhost:5000/api/cart/update/${id}`,
      { quantity: qty },
      { withCredentials: true }
    );

    fetchCart();
  };

  // ================= DELETE ITEM =================
  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/delete/${id}`, {
      withCredentials: true,
    });
    fetchCart();
  };

  // ================= CHECKOUT =================
  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("⚠️ Please login to checkout");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    if (overLimit) {
      alert("⚠️ Some items exceed available stock. Reduce quantity to proceed.");
      return;
    }

    navigate("/checkout");
  };

  // ================= TOTAL =================
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) return <div className="text-center mt-20">Cart Empty</div>;

  return (
    <div className="max-w-[1100px] mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id} className="flex bg-white p-4 mb-4 rounded shadow">
          <img
            src={`http://localhost:5000/uploads/${item.product?.image}`}
            className="w-20 h-20"
          />
          <div className="flex-1 ml-4">
            <h3>{item.product?.name}</h3>
            <p>₹{item.price}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleQuantity(item._id, item.quantity - 1)}
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => addQuantity(item)}
                //          onClick={() => handleQuantity(item._id, item.quantity + 1)}
                className="px-2 bg-gray-200 rounded"
              //  disabled={item.quantity >= item.product.stock} // prevent over stock
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p>₹{item.price * item.quantity}</p>
            <button onClick={() => handleRemove(item._id)} className="text-red-600">
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* ================= WARNING ================= */}
      {overLimit && (
        <p className="text-red-600 mb-2 font-semibold">
          ⚠️ You have added more than available stock. Reduce quantity to enable checkout.
        </p>
      )}

      <div className="flex justify-between mt-6">
        <h3>Total: ₹{total}</h3>
        <button
          onClick={handleCheckout}
          className={`px-6 py-2 rounded text-white ${overLimit ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          disabled={overLimit}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;