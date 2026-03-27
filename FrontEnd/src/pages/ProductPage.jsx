import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { CartContext } from "../context/CartContext";

const PRODUCT_API = "http://localhost:5000/api/product"; 
const CART_API = "http://localhost:5000/api/cart"; // <-- backend cart route

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${PRODUCT_API}/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      // ✅ Call correct backend cart route
      await axios.post(`${CART_API}/add`, { productId: product._id, quantity: 1 });

      // Update frontend context
      addToCart(product);

      // Navigate to cart page
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-10 font-serif">Shop All</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg font-sans"
          >
            <div className="relative">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="w-full object-cover"
              />

              {product.tag && (
                <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-400 shadow-sm">
                  {product.tag}
                </span>
              )}

              {product.rating && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-slate-900/80 px-2 py-1 text-sm text-white">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold">{product.rating}</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-xl font-medium text-gray-900">{product.name}</h2>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">₹{product.oldPrice}</span>
                )}
                {product.oldPrice && (
                  <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-8 w-full rounded-xl bg-[#802046] py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#6a1a3a]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-20">No products available.</p>
        )}
      </div>
    </main>
  );
};

export default ProductPage;