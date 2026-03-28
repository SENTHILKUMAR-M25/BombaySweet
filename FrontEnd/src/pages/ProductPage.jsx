import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PRODUCT_API = "http://localhost:5000/api/product";
const CART_API = "http://localhost:5000/api/cart";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const navigate = useNavigate();

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${PRODUCT_API}/all`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= ADD TO CART =================
  const handleAddToCart = async (product) => {
    try {
      if (product.stock <= 0) return; // prevent adding out-of-stock
      setAddingId(product._id);

      await axios.post(
        `${CART_API}/add`,
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );

      alert("✅ Added to cart");
      navigate("/cart");
    } catch (err) {
      console.error("Cart error:", err);
      alert("❌ Failed to add");
    } finally {
      setAddingId(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Loading products...
      </p>
    );
  }

  // ================= EMPTY =================
  if (products.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No products available
      </p>
    );
  }

  // ================= UI =================
  return (
    <main className="max-w-[1400px] mx-auto px-8 py-10">
      <h2 className="text-3xl font-bold mb-10">Shop Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          // Determine stock message
          let stockMsg = "In Stock";
          let stockClass = "text-green-600";
          if (product.stock === 0) {
            stockMsg = "Out of Stock";
            stockClass = "text-red-600";
          } else if (product.stock <= 3) {
            stockMsg = "Limited Stock";
            stockClass = "text-yellow-600";
          }

          return (
            <div
              key={product._id}
              className="rounded-2xl bg-white shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
                <span className={`absolute top-3 left-3 bg-white px-2 py-1 text-xs rounded shadow ${stockClass}`}>
                  {stockMsg}
                </span>
                {product.tag && (
                  <span className="absolute top-3 right-3 bg-white px-2 py-1 text-xs rounded shadow text-red-500">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold">₹{product.price}</span>

                  {product.oldPrice && (
                    <>
                      <span className="line-through text-gray-400">₹{product.oldPrice}</span>
                      <span className="text-green-600 text-sm font-bold">
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product._id || product.stock === 0}
                  className={`mt-6 w-full py-2 rounded-lg text-white transition ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : addingId === product._id
                      ? "bg-gray-400"
                      : "bg-black hover:bg-gray-800"
                  }`}
                >
                  {product.stock === 0
                    ? "Out of Stock"
                    : addingId === product._id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ProductCard;