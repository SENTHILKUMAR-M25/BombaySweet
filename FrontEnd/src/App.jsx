// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./pages/Hero";

// import AdminRegister from "./pages/Admin/AdminRegister";
// import AdminLogin from "./pages/Admin/AdminLogin";
// import AdminDashboard from "./pages/Admin/Controls/AdminDashboard";
// import AdminProtected from "./pages/Admin/AdminProtected";

// import UserRegister from "./pages/User/UserRegister";
// import UserLogin from "./pages/User/UserLogin";
// import CategoryList from "./pages/Admin/Controls/CategoryControl";
// import ProductManager from "./pages/Admin/Controls/ProductControl";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/Cartpage";

// function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* ===== Home ===== */}
//         <Route path="/" element={<Hero />} />

//         {/* ===== User Routes ===== */}
//         <Route path="/login" element={<UserLogin />} />
//         <Route path="/register" element={<UserRegister />} />

//         {/* ===== Admin Routes ===== */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/register" element={<AdminRegister />} />
//         <Route path="/admin/category" element={<CategoryList />} />
//         <Route path="/admin/product" element={<ProductManager />} />
//         <Route path="/admin/products" element={<ProductPage />} />
//         <Route path="/cart" element={<CartPage />} />

//         {/* 🔒 Protected Admin Dashboard */}
//         <Route
//           path="/admin"
//           element={
//             <AdminProtected>
//               <AdminDashboard />
//             </AdminProtected>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//     </>
//   );
// }

// export default App;








// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./pages/Hero";

// import AdminRegister from "./pages/Admin/AdminRegister";
// import AdminLogin from "./pages/Admin/AdminLogin";
// import AdminDashboard from "./pages/Admin/Controls/AdminDashboard";
// import AdminProtected from "./pages/Admin/AdminProtected";

// import UserRegister from "./pages/User/UserRegister";
// import UserLogin from "./pages/User/UserLogin";
// import CategoryList from "./pages/Admin/Controls/CategoryControl";
// import ProductManager from "./pages/Admin/Controls/ProductControl";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/Cartpage";
// import Checkout from "./pages/Checkout";

// // Wrapper to conditionally render Navbar
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideNavbarPaths = ["/login", "/register", "/admin/login", "/admin/register"];
//   const hideNavbar = hideNavbarPaths.includes(location.pathname);

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       {children}
//     </>
//   );
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           {/* ===== Home ===== */}
//           <Route path="/" element={<Hero />} />

//           {/* ===== User Routes ===== */}
//           <Route path="/login" element={<UserLogin />} />
//           <Route path="/register" element={<UserRegister />} />

//           {/* ===== Admin Routes ===== */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/register" element={<AdminRegister />} />
//           <Route path="/admin/category" element={<CategoryList />} />
//           <Route path="/admin/product" element={<ProductManager />} />
//           <Route path="/admin/products" element={<ProductPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/checkout" element={<Checkout />} />
          

//           {/* 🔒 Protected Admin Dashboard */}
//           <Route
//             path="/admin"
//             element={
//               <AdminProtected>
//                 <AdminDashboard />
//               </AdminProtected>
//             }
//           />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";

// Admin
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/Controls/AdminDashboard";
import AdminProtected from "./pages/Admin/AdminProtected";
import CategoryList from "./pages/Admin/Controls/CategoryControl";
import ProductManager from "./pages/Admin/Controls/ProductControl";
import UsersManager from "./pages/Admin/Controls/UsersControl";
import OrdersManager from "./pages/Admin/Controls/Order";

// User
import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/Cartpage";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Admin/Controls/Dashboard";
import Home from "./components/Home";

// Wrapper to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/login",
    "/register",
    "/admin/login",
    "/admin/register",
    "/admin/category",
    "/admin/orders",
    "/admin/users",
    "/admin/product",
    "/admin/dashboard",

  ];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* ===== Home ===== */}
          <Route path="/" element={<Home />} />

          {/* ===== User Routes ===== */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* ===== Admin Routes ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* 🔒 Protected Admin Dashboard with nested routes */}
          <Route
            path="/admin*"
            element={
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            }
          >
            
            {/* Nested Admin Pages */}
            <Route index element={<Navigate to="dashboard" />} />
            <Route  path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="product" element={<ProductManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="orders" element={<OrdersManager />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;