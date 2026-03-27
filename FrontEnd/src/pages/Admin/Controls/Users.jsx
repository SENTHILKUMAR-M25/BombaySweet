// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/auth"; // change if needed

// const UsersControl = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${API}/admin/users`, { withCredentials: true });
//       setUsers(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       setLoading(false);
//     }
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`${API}/admin/users/${id}`, { withCredentials: true });
//       setUsers(users.filter((user) => user._id !== id));
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Users Management</h2>

//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-3 border-b">S.No</th>
//                 <th className="p-3 border-b">ID</th>
//                 <th className="p-3 border-b">Name</th>
//                 <th className="p-3 border-b">Email</th>
//                 <th className="p-3 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="p-3 border-b">{index + 1}</td>
//                   <td className="p-3 border-b">{user._id}</td>
//                   <td className="p-3 border-b">{user.name}</td>
//                   <td className="p-3 border-b">{user.email}</td>
//                   <td className="p-3 border-b space-x-2">
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                     {/* You can add Edit button here */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersControl;