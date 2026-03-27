import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", image: null });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/category/all");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Handle form submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/category/update/${editId}`,
          data
        );
        alert("Updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/category/add",
          data
        );
        alert("Added");
      }

      setShowModal(false);
      setForm({ name: "", image: null });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert("Error");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/category/delete/${id}`);
    fetchCategories();
  };

  // ✅ Open Edit
  const handleEdit = (cat) => {
    setForm({ name: cat.name, image: null });
    setEditId(cat._id);
    setShowModal(true);
  };

  return (
    <div className="p-6">

      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Category Management</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">S.No</th>
              <th className="p-2">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{cat.categoryId}</td>
                <td className="p-2">
                  <img
                    src={`http://localhost:5000/uploads/${cat.image}`}
                    alt=""
                    className="w-14 h-14 object-cover mx-auto"
                  />
                </td>
                <td className="p-2">{cat.name}</td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              {editId ? "Edit Category" : "Add Category"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                placeholder="Category Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
                className="w-full"
                required={!editId}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-1 rounded"
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
}