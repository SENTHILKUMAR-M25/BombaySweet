// // pages/user/UserLogin.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function UserLogin() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/user/login",
//         form,
//         { withCredentials: true }
//       );

//       alert("Login success");

//       if (res.data.role === "user") {
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.msg || "Error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8b1d41] to-[#003848] p-4">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold text-center text-[#003848] mb-6">
//           User Login
//         </h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-3 bg-[#8b1d41] text-white font-semibold rounded-lg hover:bg-[#a13257] transition-all duration-300 mt-2"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-500 text-sm">
//           Don't have an account?{" "}
//           <span
//             className="text-[#8b1d41] font-semibold cursor-pointer hover:underline"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        form,
        { withCredentials: true } // important for session
      );

      alert("Login Successful!");
      if (res.data.role === "user") navigate("/"); // navigate to home
    } catch (err) {
      alert(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8b1d41] to-[#003848] p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#003848] mb-6">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1d41] transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#8b1d41] text-white font-semibold rounded-lg hover:bg-[#a13257] transition-all duration-300 mt-2"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#8b1d41] font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}