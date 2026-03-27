
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = "http://localhost:5000/api";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   // Check login status (replace with your session/auth check)
//   const isLoggedIn = localStorage.getItem("userId"); // or your auth token/session

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${API}/cart`, { withCredentials: true });
//       setCartItems(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleQuantity = async (id, qty) => {
//     if (qty < 1) return;
//     await axios.put(`${API}/cart/update/${id}`, { quantity: qty }, { withCredentials: true });
//     fetchCart();
//   };

//   const handleRemove = async (id) => {
//     await axios.delete(`${API}/cart/delete/${id}`, { withCredentials: true });
//     fetchCart();
//   };

//   const handleCheckout = () => {
//     if (!isLoggedIn) {
//       navigate("/login"); // redirect to login if not logged in
//     } else {
//       navigate("/checkout"); // go to checkout if logged in
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-[1200px] mx-auto p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex items-center bg-white p-4 rounded shadow">
//                 <img
//                   src={`http://localhost:5000/uploads/${item.product.image}`}
//                   alt={item.product.name}
//                   className="w-24 h-24 object-cover rounded"
//                 />
//                 <div className="flex-1 ml-4">
//                   <h3 className="font-bold">{item.product.name}</h3>
//                   <p>Price: ₹{item.product.price}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button onClick={() => handleQuantity(item._id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => handleQuantity(item._id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
//                   </div>
//                 </div>
//                 <button onClick={() => handleRemove(item._id)} className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 text-right">
//             <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
//             <button
//               onClick={handleCheckout}
//               className="mt-2 px-6 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
//             >
//               Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login session from backend
  const checkSession = async () => {
    try {
      const res = await axios.get(`${API}/user/session`, { withCredentials: true });
      if (res.data.user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    } catch (err) {
      console.error("Session check failed:", err);
      setIsLoggedIn(false);
    }
  };

  // ✅ Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`, { withCredentials: true });
      setCartItems(res.data);
    } catch (err) {
      console.error("Fetch cart failed:", err);
    }
  };

  useEffect(() => {
    checkSession();
    fetchCart();
  }, []);

  // Update quantity
  const handleQuantity = async (id, qty) => {
    if (qty < 1) return;
    try {
      await axios.put(`${API}/cart/update/${id}`, { quantity: qty }, { withCredentials: true });
      fetchCart();
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  // Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API}/cart/delete/${id}`, { withCredentials: true });
      fetchCart();
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  // Proceed to checkout
  const handleCheckout = () => {
    if (!isLoggedIn) navigate("/login");
    else navigate("/checkout");
  };

  // Total cart price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-white p-4 rounded shadow">
                <img
                  src={`http://localhost:5000/uploads/${item.product.image}`}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-bold">{item.product.name}</h3>
                  <p>Price: ₹{item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantity(item._id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
            <button
              onClick={handleCheckout}
              className="mt-2 px-6 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;