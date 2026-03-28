import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    oldPrice: "",
    tag: "",
    badge: "",
    rating: "",
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api";

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("FETCH PRODUCTS ERROR:", err);
    }
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("FETCH CATEGORIES ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= HANDLE FORM CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else if (["stock", "price", "oldPrice", "rating"].includes(name)) {
      setForm({ ...form, [name]: value ? Number(value) : "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ================= SUBMIT FORM =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      if (editId) {
        await axios.put(`${API}/product/update/${editId}`, formData);
        alert("Product Updated");
      } else {
        await axios.post(`${API}/product/add`, formData);
        alert("Product Added");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("SAVE PRODUCT ERROR:", err);
      alert("Error saving product");
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      stock: "",
      price: "",
      oldPrice: "",
      tag: "",
      badge: "",
      rating: "",
      image: null,
    });
    setEditId(null);
    setShowModal(false);
  };

  // ================= EDIT PRODUCT =================
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category?._id || "",
      stock: product.stock,
      price: product.price,
      oldPrice: product.oldPrice,
      tag: product.tag,
      badge: product.badge,
      rating: product.rating,
      image: null,
    });
    setEditId(product._id);
    setShowModal(true);
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API}/product/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("DELETE PRODUCT ERROR:", err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* ================= PRODUCT TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t text-center hover:bg-gray-50">
                <td className="p-2">{p.productId}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    className="w-12 h-12 object-cover mx-auto rounded"
                    alt={p.name}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.category?.name}</td>
                <td>{p.stock}</td>
                <td className="font-semibold text-green-600">₹{p.price}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                min={0}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                min={0}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                name="oldPrice"
                type="number"
                placeholder="Old Price"
                value={form.oldPrice}
                min={0}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="rating"
                type="number"
                placeholder="Rating"
                value={form.rating}
                min={0}
                max={5}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="tag"
                placeholder="Tag"
                value={form.tag}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="badge"
                placeholder="Badge"
                value={form.badge}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;