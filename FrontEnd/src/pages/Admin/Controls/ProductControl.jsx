// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     stock: "",
//     image: null,
//   });

//   // ================= FETCH DATA =================
//   const fetchProducts = async () => {
//     const res = await axios.get(`${API}/product/all`);
//     setProducts(res.data);
//   };

//   const fetchCategories = async () => {
//     const res = await axios.get(`${API}/category/all`);
//     setCategories(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setForm({ ...form, image: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   // ================= ADD / UPDATE =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("category", form.category);
//     data.append("stock", form.stock);

//     if (form.image) {
//       data.append("image", form.image);
//     }

//     try {
//       if (editId) {
//         await axios.put(`${API}/product/update/${editId}`, data);
//       } else {
//         await axios.post(`${API}/product/add`, data);
//       }

//       fetchProducts();
//       setShowModal(false);
//       setEditId(null);
//       setForm({ name: "", category: "", stock: "", image: null });
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     await axios.delete(`${API}/product/delete/${id}`);
//     fetchProducts();
//   };

//   // ================= EDIT =================
//   const handleEdit = (p) => {
//     setForm({
//       name: p.name,
//       category: p.category?._id,
//       stock: p.stock,
//       image: null,
//     });

//     setEditId(p._id);
//     setShowModal(true);
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Product Management</h2>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700 text-center">
//           <thead className="bg-gray-800">
//             <tr>
//               <th className="p-2">S.NO</th>
//               <th>ID</th>
//               <th>IMG</th>
//               <th>NAME</th>
//               <th>CATEGORY</th>
//               <th>STOCK</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p, index) => (
//               <tr key={p._id} className="border-t border-gray-700">
//                 <td>{index + 1}</td>
//                 <td>{p.productId}</td>

//                 <td>
//                   <img
//                     src={`http://localhost:5000/uploads/${p.image}`}
//                     alt=""
//                     className="w-12 h-12 object-cover mx-auto"
//                   />
//                 </td>

//                 <td>{p.name}</td>
//                 <td>{p.category?.name}</td>
//                 <td>{p.stock}</td>

//                 <td className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-yellow-500 px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-600 px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-800 p-6 rounded w-96 space-y-4"
//           >
//             <h3 className="text-xl font-bold">
//               {editId ? "Edit Product" : "Add Product"}
//             </h3>

//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               name="stock"
//               placeholder="Stock"
//               value={form.stock}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full"
//               accept="image/*"
//               required={!editId}
//             />

//             <div className="flex justify-between">
//               <button className="bg-green-600 px-4 py-2 rounded">
//                 {editId ? "Update" : "Add"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;






// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     stock: "",
//     ourPrice: "",
//     marketPrice: "",
//     image: null,
//   });

//   // ================= FETCH DATA =================
//   const fetchProducts = async () => {
//     const res = await axios.get(`${API}/product/all`);
//     setProducts(res.data);
//   };

//   const fetchCategories = async () => {
//     const res = await axios.get(`${API}/category/all`);
//     setCategories(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setForm({ ...form, image: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   // ================= ADD / UPDATE =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("category", form.category);
//     data.append("stock", form.stock);
//     data.append("ourPrice", form.ourPrice);
//     data.append("marketPrice", form.marketPrice);

//     if (form.image) {
//       data.append("image", form.image);
//     }

//     try {
//       if (editId) {
//         await axios.put(`${API}/product/update/${editId}`, data);
//       } else {
//         await axios.post(`${API}/product/add`, data);
//       }

//       fetchProducts();
//       setShowModal(false);
//       setEditId(null);
//       setForm({
//         name: "",
//         category: "",
//         stock: "",
//         ourPrice: "",
//         marketPrice: "",
//         image: null,
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     await axios.delete(`${API}/product/delete/${id}`);
//     fetchProducts();
//   };

//   // ================= EDIT =================
//   const handleEdit = (p) => {
//     setForm({
//       name: p.name,
//       category: p.category?._id,
//       stock: p.stock,
//       ourPrice: p.ourPrice,
//       marketPrice: p.marketPrice,
//       image: null,
//     });

//     setEditId(p._id);
//     setShowModal(true);
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Product Management</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700 text-center">
//           <thead className="bg-gray-800">
//             <tr>
//               <th className="p-2">S.NO</th>
//               <th>ID</th>
//               <th>IMG</th>
//               <th>NAME</th>
//               <th>CATEGORY</th>
//               <th>STOCK</th>
//               <th>OUR PRICE</th>
//               <th>MARKET PRICE</th>
//               <th>OFFER</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p, index) => (
//               <tr key={p._id} className="border-t border-gray-700">
//                 <td>{index + 1}</td>
//                 <td>{p.productId}</td>
//                 <td>
//                   <img
//                     src={`http://localhost:5000/uploads/${p.image}`}
//                     alt=""
//                     className="w-12 h-12 object-cover mx-auto"
//                   />
//                 </td>
//                 <td>{p.name}</td>
//                 <td>{p.category?.name}</td>
//                 <td>{p.stock}</td>
//                 <td>₹{p.ourPrice}</td>
//                 <td>₹{p.marketPrice}</td>
//                 <td>₹{p.offer}</td>
//                 <td className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-yellow-500 px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-600 px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-800 p-6 rounded w-96 space-y-4"
//           >
//             <h3 className="text-xl font-bold">
//               {editId ? "Edit Product" : "Add Product"}
//             </h3>

//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               name="stock"
//               placeholder="Stock"
//               value={form.stock}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="number"
//               name="ourPrice"
//               placeholder="Our Price"
//               value={form.ourPrice}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="number"
//               name="marketPrice"
//               placeholder="Market Price"
//               value={form.marketPrice}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full"
//               accept="image/*"
//               required={!editId}
//             />

//             <div className="flex justify-between">
//               <button className="bg-green-600 px-4 py-2 rounded">
//                 {editId ? "Update" : "Add"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     stock: "",
//     price: "",
//     oldPrice: "",
//     image: null,
//   });

//   // ================= FETCH =================
//   const fetchProducts = async () => {
//     const res = await axios.get(`${API}/product/all`);
//     setProducts(res.data);
//   };

//   const fetchCategories = async () => {
//     const res = await axios.get(`${API}/category/all`);
//     setCategories(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   // ================= CHANGE =================
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setForm({ ...form, image: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("category", form.category);
//     data.append("stock", form.stock);
//     data.append("price", form.price);
//     data.append("oldPrice", form.oldPrice);

//     if (form.image) data.append("image", form.image);

//     try {
//       if (editId) {
//         await axios.put(`${API}/product/update/${editId}`, data);
//       } else {
//         await axios.post(`${API}/product/add`, data);
//       }

//       fetchProducts();
//       setShowModal(false);
//       setEditId(null);
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       stock: "",
//       price: "",
//       oldPrice: "",
//       image: null,
//     });
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     await axios.delete(`${API}/product/delete/${id}`);
//     fetchProducts();
//   };

//   // ================= EDIT =================
//   const handleEdit = (p) => {
//     setForm({
//       name: p.name,
//       category: p.category?._id,
//       stock: p.stock,
//       price: p.price,
//       oldPrice: p.oldPrice,
//       image: null,
//     });

//     setEditId(p._id);
//     setShowModal(true);
//   };

//   // ================= OFFER CALC =================
//   const getOffer = (price, oldPrice) => {
//     if (!oldPrice) return "-";
//     return `${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
      
//       {/* HEADER */}
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Product Management</h2>
//         <button
//           onClick={() => {
//             resetForm();
//             setEditId(null);
//             setShowModal(true);
//           }}
//           className="bg-blue-600 px-4 py-2 rounded"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-700 text-center">
//           <thead className="bg-gray-800">
//             <tr>
//               <th>S.NO</th>
//               <th>ID</th>
//               <th>IMG</th>
//               <th>NAME</th>
//               <th>CATEGORY</th>
//               <th>STOCK</th>
//               <th>PRICE</th>
//               <th>OLD PRICE</th>
//               <th>OFFER</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((p, index) => (
//               <tr key={p._id} className="border-t border-gray-700">
//                 <td>{index + 1}</td>
//                 <td>{p.productId}</td>

//                 <td>
//                   <img
//                     src={`http://localhost:5000/uploads/${p.image}`}
//                     className="w-12 h-12 object-cover mx-auto rounded"
//                     alt=""
//                   />
//                 </td>

//                 <td>{p.name}</td>
//                 <td>{p.category?.name}</td>
//                 <td>{p.stock}</td>

//                 <td className="text-green-400 font-bold">₹{p.price}</td>

//                 <td className="line-through text-gray-400">
//                   {p.oldPrice ? `₹${p.oldPrice}` : "-"}
//                 </td>

//                 <td>
//                   {p.oldPrice && (
//                     <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
//                       {getOffer(p.price, p.oldPrice)} OFF
//                     </span>
//                   )}
//                 </td>

//                 <td className="space-x-2">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-yellow-500 px-2 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-600 px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-gray-800 p-6 rounded w-96 space-y-4"
//           >
//             <h3 className="text-xl font-bold">
//               {editId ? "Edit Product" : "Add Product"}
//             </h3>

//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               name="stock"
//               placeholder="Stock"
//               value={form.stock}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="number"
//               name="price"
//               placeholder="Our Price"
//               value={form.price}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//               required
//             />

//             <input
//               type="number"
//               name="oldPrice"
//               placeholder="Market Price"
//               value={form.oldPrice}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-700 rounded"
//             />

//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full"
//               accept="image/*"
//               required={!editId}
//             />

//             <div className="flex justify-between">
//               <button className="bg-green-600 px-4 py-2 rounded">
//                 {editId ? "Update" : "Add"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;




import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    oldPrice: "",
    rating: "",
    tag: "",
    badge: "",
    image: null,
  });

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/product/all`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= CHANGE =================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("stock", form.stock);
    data.append("price", form.price);
    data.append("oldPrice", form.oldPrice || "");
    data.append("rating", form.rating || "");
    data.append("tag", form.tag || "");
    data.append("badge", form.badge || "");

    if (form.image) data.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`${API}/product/update/${editId}`, data);
      } else {
        await axios.post(`${API}/product/add`, data);
      }

      fetchProducts();
      setShowModal(false);
      setEditId(null);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      stock: "",
      price: "",
      oldPrice: "",
      rating: "",
      tag: "",
      badge: "",
      image: null,
    });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API}/product/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      category: p.category?._id || "",
      stock: p.stock,
      price: p.price,
      oldPrice: p.oldPrice || "",
      rating: p.rating || "",
      tag: p.tag || "",
      badge: p.badge || "",
      image: null,
    });

    setEditId(p._id);
    setShowModal(true);
  };

  // ================= OFFER CALC =================
  const getOffer = (price, oldPrice) => {
    if (!oldPrice) return "-";
    return `${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-center">
          <thead className="bg-gray-800">
            <tr>
              <th>S.NO</th>
              <th>ID</th>
              <th>IMG</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>PRICE</th>
              <th>OLD PRICE</th>
              <th>OFFER</th>
              <th>RATING</th>
              <th>TAG</th>
              <th>BADGE</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={p._id} className="border-t border-gray-700">
                <td>{index + 1}</td>
                <td>{p.productId}</td>

                <td>
                  {p.image && (
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      className="w-12 h-12 object-cover mx-auto rounded"
                      alt=""
                    />
                  )}
                </td>

                <td>{p.name}</td>
                <td>{p.category?.name}</td>
                <td>{p.stock}</td>
                <td className="text-green-400 font-bold">₹{p.price}</td>
                <td className="line-through text-gray-400">{p.oldPrice ? `₹${p.oldPrice}` : "-"}</td>
                <td>
                  {p.oldPrice && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                      {getOffer(p.price, p.oldPrice)} OFF
                    </span>
                  )}
                </td>
                <td>{p.rating || "-"}</td>
                <td>{p.tag || "-"}</td>
                <td>{p.badge || "-"}</td>

                <td className="space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded w-96 space-y-3">
            <h3 className="text-xl font-bold">{editId ? "Edit Product" : "Add Product"}</h3>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Our Price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />

            <input
              type="number"
              name="oldPrice"
              placeholder="Market Price"
              value={form.oldPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
            />

            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={form.rating}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
              min={1}
              max={5}
            />

            <input
              type="text"
              name="tag"
              placeholder="Tag"
              value={form.tag}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
            />

            <input
              type="text"
              name="badge"
              placeholder="Badge"
              value={form.badge}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded"
            />

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full"
              accept="image/*"
              required={!editId}
            />

            <div className="flex justify-between">
              <button className="bg-green-600 px-4 py-2 rounded">{editId ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Product;