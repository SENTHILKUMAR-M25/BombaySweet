// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, Search, User, ShoppingCart, ChevronRight } from 'lucide-react';
// import logo from "../assets/LOGO.png"
// const Navbar = () => {
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // Data for Shop All Sidebar
//   const categories = [
//     { name: 'Hampers', icon: '🎁' },
//     { name: 'Mithai', icon: '🍬' },
//     { name: 'Chocolate', icon: '🍫' },
//     { name: 'Namkeen', icon: '🍿' },
//     { name: 'Cookies & Chikkis', icon: '🍪' },
//     { name: 'From The Kadhai', icon: '🍳' },
//   ];

//   // Data for Shop All Products
//   const products = [
//     { name: 'Bombay Sweet Shop Snack Box', img: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400' },
//     { name: "The Chocolate Lover's Hamper", img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400' },
//     { name: 'Best of Bombay Sweet Shop', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400' },
//     { name: 'Bombay Sweet Shop Care Package', img: 'https://images.unsplash.com/photo-1549462184-b09ad0a4760b?w=400' },
//   ];

// const customizedGifts = [
//   { name: 'Baby Announcement', img: 'https://images.unsplash.com/photo-1518331614322-68040a436214?w=400' },
//   { name: 'Corporate Gifting', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
//   { name: 'Celebrations', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=400' },
//   { name: 'Customized Gifting', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' },
//   { name: 'Wedding', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400' },
// ];
// const ribbonCategories = [
//     { name: 'Birthday Sale', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=100' },
//     { name: 'Guilt-Free', img: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=100' },
//     { name: 'Shop Mumbai', img: 'https://images.unsplash.com/photo-1570160897040-30430ed22112?w=100' },
//     { name: 'Shop All-India', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=100' },
//     { name: 'Mithai', img: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=100' },
//     { name: 'Chocolate', img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100' },
//     { name: 'Namkeen', img: 'https://images.unsplash.com/photo-1613919113166-2990a424a737?w=100' },
//     { name: 'Cookies & Chikki', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100' },
//     { name: 'Gifting', img: 'https://images.unsplash.com/photo-1549462184-b09ad0a4760b?w=100' },
//   ];
//   return (
//     <div className="bg-white font-sans text-[#003848]">
//       {/* Top Promotional Bar */}
//       <div className="bg-[#8b1d41] text-white text-center py-2 text-sm font-medium">
//         Free shipping on orders ₹1500 & above 🚚
//       </div>

//       {/* Main Header */}
//       <header className="px-8 py-4 border-b border-gray-100 relative">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
//           <div className="flex-shrink-0">
//             <img src={logo} alt=""  className='h-10 w-25' />
//           </div>

//           {/* Search Bar */}
//           <div className="flex-grow flex items-center max-w-2xl bg-[#f2f4f5] rounded-lg px-4 py-2 border border-gray-200">
//              <div className="flex items-center gap-2 pr-4 border-r border-gray-300 text-sm">
//                 <span>All</span> <ChevronDown size={14} />
//              </div>
//              <input type="text" placeholder="Search for anything" className="bg-transparent w-full px-4 outline-none text-sm" />
//              <Search size={18} className="text-gray-500" />
//           </div>

//           <div className="flex items-center gap-6 text-gray-700">
//             <User size={22} className="cursor-pointer" />
//             <div className="relative cursor-pointer">
//               <ShoppingCart size={22} />
//               <span className="absolute -top-2 -right-2 bg-[#003848] text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">0</span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Bar */}
//         <nav className="max-w-7xl mx-auto mt-6 flex items-center justify-between text-[15px] font-medium">
//           <div className="flex gap-8 items-center">

//             {/* SHOP ALL - UPDATED MEGA MENU */}
//             <div 
//               className="py-2"
//               onMouseEnter={() => setActiveDropdown('shopAll')}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'shopAll' ? 'text-[#8b1d41]' : ''}`}>
//                 Shop All <ChevronDown size={14} />
//               </span>

//               <AnimatePresence>
//                 {activeDropdown === 'shopAll' && (
//                   <>
//                     <motion.div 
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 15 }}
//                       className="absolute left-0 top-30 w-full bg-[#003848] text-white z-50 shadow-2xl flex border-t border-[#ffffff1a]"
//                     >
//                       {/* Left Sidebar */}
//                       <div className="w-1/4 border-r border-[#ffffff1a] py-10 pl-12 bg-[#002d3a]">
//                         <div className="flex flex-col gap-2">
//                           {categories.map((cat) => (
//                             <div 
//                               key={cat.name} 
//                               className="flex items-center justify-between py-3 pr-8 hover:bg-[#ffffff0d] cursor-pointer group rounded-l-lg transition-all"
//                             >
//                               <div className="flex items-center gap-4">
//                                 <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
//                                 <span className="text-sm font-semibold tracking-wide uppercase opacity-80 group-hover:opacity-100">{cat.name}</span>
//                               </div>
//                               <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Right Product Grid */}
//                       <div className="w-3/4 p-12">
//                         <div className="grid grid-cols-4 gap-8">
//                           {products.map((item, idx) => (
//                             <motion.div 
//                               key={item.name}
//                               initial={{ opacity: 0, scale: 0.95 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: idx * 0.03 }}
//                               className="flex flex-col gap-4 group cursor-pointer"
//                             >
//                               <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
//                                 <img 
//                                   src={item.img} 
//                                   alt={item.name} 
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                               </div>
//                               <h4 className="text-[13px] font-medium leading-snug group-hover:text-gray-300">
//                                 {item.name}
//                               </h4>
//                             </motion.div>
//                           ))}
//                         </div>
//                         <div className="mt-10 border-t border-[#ffffff1a] pt-6">
//                           <button className="text-xs uppercase tracking-[0.2em] font-bold border-b-2 border-white pb-1 hover:text-[#8b1d41] hover:border-[#8b1d41] transition-all">
//                             Shop All Hampers
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[145px] bg-black/30 backdrop-blur-[2px] -z-10" />
//                   </>
//                 )}
//               </AnimatePresence>
//             </div>

// <div 
//   className="relative cursor-pointer py-2"
//   onMouseEnter={() => setActiveDropdown('hampers')}
//   onMouseLeave={() => setActiveDropdown(null)}
// >
//   <span className={`flex items-center gap-1 transition-colors ${activeDropdown === 'hampers' ? 'text-[#8b1d41]' : ''}`}>
//     Hampers <ChevronDown size={14} />
//   </span>
//   <AnimatePresence>
//     {activeDropdown === 'hampers' && (
//       <motion.div 
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 z-50 rounded-md py-2 text-[#003848]"
//       >
//         {['Mithai Box', 'Chocolate Hamper', 'Party Packs'].map(item => (
//           <div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">{item}</div>
//         ))}
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div>
// {/* CUSTOMISED GIFTING - MEGA MENU (KEEPING YOUR PREVIOUS LOGIC) */}
// <div 
//   className="py-2"
//   onMouseEnter={() => setActiveDropdown('custom')}
//   onMouseLeave={() => setActiveDropdown(null)}
// >
//   <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'custom' ? 'text-[#8b1d41]' : ''}`}>
//     Customised Gifting <ChevronDown size={14} />
//   </span>
//   <AnimatePresence>
//     {activeDropdown === 'custom' && (
//       <>
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//           className="absolute left-0 top-30 w-full bg-[#003848] text-white z-50 shadow-2xl p-10"
//         >
//           <div className="max-w-7xl mx-auto grid grid-cols-5 gap-6">
//             {customizedGifts.map((gift, idx) => (
//               <motion.div key={gift.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group cursor-pointer">
//                 <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-[#ffffff1a]">
//                   <img src={gift.img} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
//                 </div>
//                 <h3 className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">{gift.name}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//         <div className="fixed inset-0 top-[145px] bg-black/20 backdrop-blur-sm -z-10" />
//       </>
//     )}
//   </AnimatePresence>
// </div>
//         </div>

//           <div className="flex gap-8 text-gray-500 font-normal">
//             <span className="cursor-pointer hover:text-[#003848]">Our Stores</span>
//             <span className="cursor-pointer hover:text-[#003848]">About Us</span>
//             <span className="cursor-pointer hover:text-[#003848]">Sweets Library</span>
//             <span className="cursor-pointer hover:text-[#003848]">Blog</span>
//           </div>
//         </nav>
//         <section className="bg-[#fdfaf4] py-8">
//         <div className="max-w-[1400px] mx-auto px-8">
//           <div className="flex items-start justify-between">
//             {ribbonCategories.map((cat) => (
//               <div key={cat.name} className="flex flex-col items-center gap-3 group cursor-pointer w-[110px]">
//                 <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8b1d41] transition-all duration-300 shadow-md">
//                   <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                 </div>
//                 <span className="text-[13px] font-bold text-center leading-tight transition-colors group-hover:text-[#8b1d41]">
//                   {cat.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       </header>
//     </div>
//   );
// };

// const NavItem = ({ label, hasDropdown }) => (
//   <div className="flex items-center gap-1 cursor-pointer hover:text-[#8b1d41] py-2">
//     {label} {hasDropdown && <ChevronDown size={14} />}
//   </div>
// );

// export default Navbar;







// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, Search, User, ShoppingCart, ChevronRight } from 'lucide-react';
// import axios from 'axios';
// import logo from "../assets/LOGO.png";

// const Navbar = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [user, setUser] = useState(null);

//   // Ribbon categories
//   const ribbonCategories = [
//     { name: 'Birthday Sale', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=100' },
//     { name: 'Guilt-Free', img: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=100' },
//     { name: 'Shop Mumbai', img: 'https://images.unsplash.com/photo-1570160897040-30430ed22112?w=100' },
//     { name: 'Shop All-India', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?w=100' },
//     { name: 'Mithai', img: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=100' },
//     { name: 'Chocolate', img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100' },
//     { name: 'Namkeen', img: 'https://images.unsplash.com/photo-1613919113166-2990a424a737?w=100' },
//     { name: 'Cookies & Chikki', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100' },
//     { name: 'Gifting', img: 'https://images.unsplash.com/photo-1549462184-b09ad0a4760b?w=100' },
//   ];
//   const customizedGifts = [
//     { name: 'Baby Announcement', img: 'https://images.unsplash.com/photo-1518331614322-68040a436214?w=400' },
//     { name: 'Corporate Gifting', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
//     { name: 'Celebrations', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=400' },
//     { name: 'Customized Gifting', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' },
//     { name: 'Wedding', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400' },
//   ];
//   // ======================================
//   // Fetch categories & login info on load
//   // ======================================
//   useEffect(() => {
//     fetchCategories();
//     checkUser();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/category/all");
//       setCategories(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchProductsByCategory = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/product/category/${id}`);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const checkUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
//       setUser(res.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//       setUser(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white font-sans text-[#003848]">
//       {/* Top Promotional Bar */}
//       <div className="bg-[#8b1d41] text-white text-center py-2 text-sm font-medium">
//         Free shipping on orders ₹1500 & above 🚚
//       </div>

//       {/* Main Header */}
//       <header className="px-8 py-4 border-b border-gray-100 relative">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
//           <div className="flex-shrink-0">
//             <img src={logo} alt="Logo" className='h-10 w-25' />
//           </div>

//           {/* Search Bar */}
//           <div className="flex-grow flex items-center max-w-2xl bg-[#f2f4f5] rounded-lg px-4 py-2 border border-gray-200">
//             <div className="flex items-center gap-2 pr-4 border-r border-gray-300 text-sm">
//               <span>All</span> <ChevronDown size={14} />
//             </div>
//             <input type="text" placeholder="Search for anything" className="bg-transparent w-full px-4 outline-none text-sm" />
//             <Search size={18} className="text-gray-500" />
//           </div>

//           {/* User & Cart */}
//           <div className="flex items-center gap-6 text-gray-700">
//             {user ? (
//               <div
//                 onClick={handleLogout}
//                 className="w-8 h-8 rounded-full bg-[#003848] text-white flex items-center justify-center cursor-pointer"
//               >
//                 {user.name?.charAt(0).toUpperCase()}
//               </div>
//             ) : (
//               <User
//                 size={22}
//                 className="cursor-pointer"
//                 onClick={() => window.location.href = "/login"}
//               />
//             )}

//             <div className="relative cursor-pointer">
//               <ShoppingCart size={22} />
//               <span className="absolute -top-2 -right-2 bg-[#003848] text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">0</span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Bar */}
//         <nav className="max-w-7xl mx-auto mt-6 flex items-center justify-between text-[15px] font-medium">
//           <div className="flex gap-8 items-center">
//             {/* SHOP ALL - DYNAMIC */}
//             <div
//               className="py-2"
//               onMouseEnter={() => setActiveDropdown('shopAll')}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'shopAll' ? 'text-[#8b1d41]' : ''}`}>
//                 Shop All <ChevronDown size={14} />
//               </span>

//               <AnimatePresence>
//                 {activeDropdown === 'shopAll' && (
//                   <>
//                     <motion.div
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 15 }}
//                       className="absolute left-0 top-30 w-full bg-[#003848] text-white z-50 shadow-2xl flex border-t border-[#ffffff1a]"
//                     >
//                       {/* Left Sidebar Categories */}
//                       <div className="w-1/4 border-r border-[#ffffff1a] py-10 pl-12 bg-[#002d3a]">
//                         {categories.map(cat => (
//                           <div
//                             key={cat._id}
//                             onMouseEnter={() => {
//                               setActiveCategory(cat._id);
//                               fetchProductsByCategory(cat._id);
//                             }}
//                             className="flex items-center justify-between py-3 pr-8 hover:bg-[#ffffff0d] cursor-pointer group rounded-l-lg transition-all"
//                           >
//                             <span className="text-sm font-semibold uppercase opacity-80 group-hover:opacity-100">{cat.name}</span>
//                             <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
//                           </div>
//                         ))}
//                       </div>

//                       {/* Right Product Grid */}
//                       <div className="w-3/4 p-12 grid grid-cols-4 gap-8">
//                         {products.map((item, idx) => (
//                           <motion.div
//                             key={item._id}
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: idx * 0.03 }}
//                             className="flex flex-col gap-4 group cursor-pointer"
//                           >
//                             <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
//                               <img
//                                 src={`http://localhost:5000/uploads/${item.image}`}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                               />
//                             </div>
//                             <h4 className="text-[13px] font-medium leading-snug group-hover:text-gray-300">
//                               {item.name}
//                             </h4>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 top-[145px] bg-black/30 backdrop-blur-[2px] -z-10" />
//                   </>
//                 )}
//               </AnimatePresence>
//             </div>
//             <div 
//               className="relative cursor-pointer py-2"
//               onMouseEnter={() => setActiveDropdown('hampers')}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <span className={`flex items-center gap-1 transition-colors ${activeDropdown === 'hampers' ? 'text-[#8b1d41]' : ''}`}>
//                 Hampers <ChevronDown size={14} />
//               </span>
//               <AnimatePresence>
//                 {activeDropdown === 'hampers' && (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 z-50 rounded-md py-2 text-[#003848]"
//                   >
//                     {['Mithai Box', 'Chocolate Hamper', 'Party Packs'].map(item => (
//                       <div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">{item}</div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             {/* CUSTOMISED GIFTING - MEGA MENU (KEEPING YOUR PREVIOUS LOGIC) */}
//             <div 
//               className="py-2"
//               onMouseEnter={() => setActiveDropdown('custom')}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'custom' ? 'text-[#8b1d41]' : ''}`}>
//                 Customised Gifting <ChevronDown size={14} />
//               </span>
//               <AnimatePresence>
//                 {activeDropdown === 'custom' && (
//                   <>
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 20 }}
//                       className="absolute left-0 top-30 w-full bg-[#003848] text-white z-50 shadow-2xl p-10"
//                     >
//                       <div className="max-w-7xl mx-auto grid grid-cols-5 gap-6">
//                         {customizedGifts.map((gift, idx) => (
//                           <motion.div key={gift.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group cursor-pointer">
//                             <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-[#ffffff1a]">
//                               <img src={gift.img} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
//                             </div>
//                             <h3 className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">{gift.name}</h3>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </motion.div>
//                     <div className="fixed inset-0 top-[145px] bg-black/20 backdrop-blur-sm -z-10" />
//                   </>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           <div className="flex gap-8 text-gray-500 font-normal">
//             <span className="cursor-pointer hover:text-[#003848]">Our Stores</span>
//             <span className="cursor-pointer hover:text-[#003848]">About Us</span>
//             <span className="cursor-pointer hover:text-[#003848]">Sweets Library</span>
//             <span className="cursor-pointer hover:text-[#003848]">Blog</span>
//           </div>
//         </nav>

//         {/* Ribbon Section */}
//         <section className="bg-[#fdfaf4] py-8">
//           <div className="max-w-[1400px] mx-auto px-8">
//             <div className="flex items-start justify-between">
//               {ribbonCategories.map((cat) => (
//                 <div key={cat.name} className="flex flex-col items-center gap-3 group cursor-pointer w-[110px]">
//                   <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8b1d41] transition-all duration-300 shadow-md">
//                     <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                   </div>
//                   <span className="text-[13px] font-bold text-center leading-tight transition-colors group-hover:text-[#8b1d41]">
//                     {cat.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </header>
//     </div>
//   );
// };

// export default Navbar;






// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, Search, User, ShoppingCart, ChevronRight } from 'lucide-react';
// import axios from 'axios';
// import logo from "../assets/LOGO.png";

// const Navbar = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   // Ribbon & Customised Gifting Data
//   const ribbonCategories = [
//     { name: 'Birthday Sale', img: "https://bombaysweetshop.com/cdn/shop/files/birthday_icon_revised.png?v=1774375070&width=407" },
//     { name: 'Guilt-Free', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_20251230_GF_DA_WEB_GUILT_FREE_MOBILE_ICON_1.jpg?v=1767094584&width=407' },
//     { name: 'Shop Mumbai', img: 'https://bombaysweetshop.com/cdn/shop/files/Mumbai_275x_7086abd6-9d7b-42d2-bfbc-9d8de8dcf843_1.jpg?v=1686727004&width=407' },
//     { name: 'Shop All-India', img: 'https://bombaysweetshop.com/cdn/shop/files/Pan_India_275x_185a0f26-d851-45bc-a83c-8f9408b8bba0.jpg?v=1686727229&width=407' },
//     { name: 'Mithai', img: 'https://bombaysweetshop.com/cdn/shop/files/Mithai_275x_2_efc52b81-3d17-4be1-a811-127b5224a159.jpg?v=1686727354&width=407' },
//     { name: 'Chocolate', img: 'https://bombaysweetshop.com/cdn/shop/files/Chocolate_275x_a7cce29b-2645-4b28-87ce-428037753274.jpg?v=1686727279&width=407' },
//     { name: 'Namkeen', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_20260305_BAU_DA_WEB_NAMKEEN_ICON_758b4ea8-ab84-4de4-b549-cd39cdfbb68a.png?v=1774328709&width=407' },
//     { name: 'Cookies & Chikki', img: 'https://bombaysweetshop.com/cdn/shop/files/Confectionary.png?v=1685011189&width=407' },
//     { name: 'Gifting', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_MKT_250609_DIWALI_CATALOGUE_PS_LARGE_RANI_BAUG_BOX.jpg?v=1752504444&width=407' },
//   ];

//   const customizedGifts = [
//     { name: 'Baby Announcement', img: 'https://images.unsplash.com/photo-1518331614322-68040a436214?w=400' },
//     { name: 'Corporate Gifting', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
//     { name: 'Celebrations', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=400' },
//     { name: 'Customized Gifting', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' },
//     { name: 'Wedding', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400' },
//   ];

//   // Fetch categories & user info
//   useEffect(() => {
//     fetchCategories();
//     checkUser();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/category/all");
//       setCategories(res.data.categories || res.data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchProductsByCategory = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/product/category/${id}`);
//       setProducts(res.data.products || res.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//     }
//   };

//   const checkUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
//       const loggedInUser = res.data.user || res.data;
//       setUser(loggedInUser);
//       fetchCartCount(loggedInUser._id); // <-- fetch cart count for this user
//     } catch {
//       setUser(null);
//       setCartCount(0);
//     }
//   };

//   const fetchCartCount = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, { withCredentials: true });
//       const cartItems = res.data.items || [];
//       const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//       setCartCount(totalQuantity);
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//       setCartCount(0);
//     }
//   };
//   };


//   const checkUser = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
//       setUser(res.data.user || res.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <div className="bg-white font-sans text-[#003848]">
//       {/* Top Promotional Bar */}
//       <div className="bg-[#8b1d41] text-white text-center py-2 text-sm font-medium">
//         Free shipping on orders ₹1500 & above 🚚
//       </div>

//       {/* Header */}
//       <header className="px-8 py-4 border-b border-gray-100 relative">
//         <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
//           <img src={logo} alt="Logo" className="h-10 w-25" />

//           {/* Search */}
//           <div className="flex-grow flex items-center max-w-2xl bg-[#f2f4f5] rounded-lg px-4 py-2 border border-gray-200">
//             <div className="flex items-center gap-2 pr-4 border-r border-gray-300 text-sm">
//               <span>All</span> <ChevronDown size={14} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search for anything"
//               className="bg-transparent w-full px-4 outline-none text-sm"
//             />
//             <Search size={18} className="text-gray-500" />
//           </div>

//           {/* User & Cart */}
//           <div className="flex items-center gap-6 text-gray-700">
//             {user ? (
//               <div
//                 onClick={handleLogout}
//                 className="w-8 h-8 rounded-full bg-[#003848] text-white flex items-center justify-center cursor-pointer"
//               >
//                 {user.name?.charAt(0).toUpperCase()}
//               </div>
//             ) : (
//               <User size={22} className="cursor-pointer" onClick={() => window.location.href = "/login"} />
//             )}

//              <div className="relative cursor-pointer" onClick={() => window.location.href = "/cart"}>
//               <ShoppingCart size={22} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-[#003848] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Navbar */}
//         <nav className="max-w-7xl mx-auto mt-6 flex items-center justify-between text-[15px] font-medium">
//           <div className="flex gap-8 items-center">

//             <div
//               className="py-2 relative"
//               onMouseEnter={() => setActiveDropdown('shopAll')}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <span
//                 className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'shopAll' ? 'text-[#8b1d41]' : ''
//                   }`}
//               >
//                 Shop All <ChevronDown size={14} />
//               </span>

//               <AnimatePresence>
//                 {activeDropdown === 'shopAll' && (
//                   <>
//                     {/* Dropdown Container */}
//                     <motion.div
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 15 }}
//                       className="absolute left-0 top-full w-[95vw] max-w-[1200px] bg-[#003848] text-white z-50 shadow-2xl flex border-t border-[#ffffff1a] rounded-b-xl overflow-hidden"
//                     >
//                       {/* Categories List */}
//                       <div className="w-1/4 border-r border-[#ffffff1a] py-6 px-6 bg-[#002d3a] min-h-[300px]">
//                         {categories.length > 0 ? (
//                           categories.map((cat) => (
//                             <div
//                               key={cat._id}
//                               onMouseEnter={() => {
//                                 setActiveCategory(cat._id);
//                                 fetchProductsByCategory(cat._id);
//                               }}
//                               className="flex items-center justify-between py-3 pr-4 hover:bg-[#ffffff0d] cursor-pointer group rounded-l-lg transition-all"
//                             >
//                               <span className="text-sm font-semibold uppercase opacity-80 group-hover:opacity-100">
//                                 {cat.name}
//                               </span>
//                               <ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
//                             </div>
//                           ))
//                         ) : (
//                           <span className="text-sm opacity-50">No categories</span>
//                         )}
//                       </div>

//                       {/* Products Grid */}
//                       <div className="w-3/4 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {products.length > 0 ? (
//                           products.map((item, idx) => (
//                             <motion.div
//                               key={item._id}
//                               initial={{ opacity: 0, scale: 0.95 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: idx * 0.03 }}
//                               className="flex flex-col gap-2 group cursor-pointer"
//                             >
//                               <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-inner">
//                                 <img
//                                   src={`http://localhost:5000/uploads/${item.image}`}
//                                   alt={item.name}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                 />
//                               </div>
//                               <h4 className="text-[13px] font-medium leading-snug group-hover:text-gray-300">
//                                 {item.name}
//                               </h4>
//                             </motion.div>
//                           ))
//                         ) : (
//                           <span className="text-white col-span-4 text-center opacity-50">
//                             No products
//                           </span>
//                         )}
//                       </div>
//                     </motion.div>

//                     {/* Backdrop */}
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="fixed inset-0 top-[100px] bg-black/30 backdrop-blur-sm z-40"
//                     />
//                   </>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Hampers Dropdown */}
//             <DropdownMenu label="Hampers" items={['Mithai Box', 'Chocolate Hamper', 'Party Packs']} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />

//             {/* Customised Gifting */}
//             <CustomisedGiftingDropdown activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} gifts={customizedGifts} />
//           </div>

//           <div className="flex gap-8 text-gray-500 font-normal">
//             <span className="cursor-pointer hover:text-[#003848]">Our Stores</span>
//             <span className="cursor-pointer hover:text-[#003848]">About Us</span>
//             <span className="cursor-pointer hover:text-[#003848]">Sweets Library</span>
//             <span className="cursor-pointer hover:text-[#003848]">Blog</span>
//           </div>
//         </nav>

//         {/* Ribbon Section */}
//         <RibbonSection categories={ribbonCategories} />
//       </header>
//     </div>
//   );
// };

// // -------------------- Reusable Components --------------------

// const DropdownMenu = ({ label, items, activeDropdown, setActiveDropdown }) => (
//   <div
//     className="relative py-2 cursor-pointer"
//     onMouseEnter={() => setActiveDropdown(label.toLowerCase())}
//     onMouseLeave={() => setActiveDropdown(null)}
//   >
//     <span className={`flex items-center gap-1 transition-colors ${activeDropdown === label.toLowerCase() ? 'text-[#8b1d41]' : ''}`}>
//       {label} <ChevronDown size={14} />
//     </span>
//     <AnimatePresence>
//       {activeDropdown === label.toLowerCase() && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 z-50 rounded-md py-2 text-[#003848]"
//         >
//           {items.map(item => <div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">{item}</div>)}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );

// const CustomisedGiftingDropdown = ({ activeDropdown, setActiveDropdown, gifts }) => (
//   <div className="py-2" onMouseEnter={() => setActiveDropdown('custom')} onMouseLeave={() => setActiveDropdown(null)}>
//     <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'custom' ? 'text-[#8b1d41]' : ''}`}>
//       Customised Gifting <ChevronDown size={14} />
//     </span>
//     <AnimatePresence>
//       {activeDropdown === 'custom' && (
//         <>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="absolute left-0 top-30 w-full bg-[#003848] text-white z-50 shadow-2xl p-10"
//           >
//             <div className="max-w-7xl mx-auto grid grid-cols-5 gap-6">
//               {gifts.map((gift, idx) => (
//                 <motion.div key={gift.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group cursor-pointer">
//                   <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-[#ffffff1a]">
//                     <img src={gift.img} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
//                   </div>
//                   <h3 className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">{gift.name}</h3>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//           <div className="fixed inset-0 top-[145px] bg-black/20 backdrop-blur-sm -z-10" />
//         </>
//       )}
//     </AnimatePresence>
//   </div>
// );

// const RibbonSection = ({ categories }) => (
//   <section className="bg-[#fdfaf4] py-8">
//     <div className="max-w-[1400px] mx-auto px-8">
//       <div className="flex items-start justify-between flex-wrap gap-4">
//         {categories.map(cat => (
//           <div key={cat.name} className="flex flex-col items-center gap-3 group cursor-pointer w-[110px]">
//             <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8b1d41] transition-all duration-300 shadow-md">
//               <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//             </div>
//             <span className="text-[13px] font-bold text-center leading-tight transition-colors group-hover:text-[#8b1d41]">{cat.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default Navbar;





import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, User, ShoppingCart, ChevronRight } from 'lucide-react';
import axios from 'axios';
import logo from "../assets/LOGO.png";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Ribbon & Customised Gifting Data
  const ribbonCategories = [
    { name: 'Birthday Sale', img: "https://bombaysweetshop.com/cdn/shop/files/birthday_icon_revised.png?v=1774375070&width=407" },
    { name: 'Guilt-Free', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_20251230_GF_DA_WEB_GUILT_FREE_MOBILE_ICON_1.jpg?v=1767094584&width=407' },
    { name: 'Shop Mumbai', img: 'https://bombaysweetshop.com/cdn/shop/files/Mumbai_275x_7086abd6-9d7b-42d2-bfbc-9d8de8dcf843_1.jpg?v=1686727004&width=407' },
    { name: 'Shop All-India', img: 'https://bombaysweetshop.com/cdn/shop/files/Pan_India_275x_185a0f26-d851-45bc-a83c-8f9408b8bba0.jpg?v=1686727229&width=407' },
    { name: 'Mithai', img: 'https://bombaysweetshop.com/cdn/shop/files/Mithai_275x_2_efc52b81-3d17-4be1-a811-127b5224a159.jpg?v=1686727354&width=407' },
    { name: 'Chocolate', img: 'https://bombaysweetshop.com/cdn/shop/files/Chocolate_275x_a7cce29b-2645-4b28-87ce-428037753274.jpg?v=1686727279&width=407' },
    { name: 'Namkeen', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_20260305_BAU_DA_WEB_NAMKEEN_ICON_758b4ea8-ab84-4de4-b549-cd39cdfbb68a.png?v=1774328709&width=407' },
    { name: 'Cookies & Chikki', img: 'https://bombaysweetshop.com/cdn/shop/files/Confectionary.png?v=1685011189&width=407' },
    { name: 'Gifting', img: 'https://bombaysweetshop.com/cdn/shop/files/BSS_MKT_250609_DIWALI_CATALOGUE_PS_LARGE_RANI_BAUG_BOX.jpg?v=1752504444&width=407' },
  ];

  const customizedGifts = [
    { name: 'Baby Announcement', img: 'https://images.unsplash.com/photo-1518331614322-68040a436214?w=400' },
    { name: 'Corporate Gifting', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
    { name: 'Celebrations', img: 'https://images.unsplash.com/photo-1530103862676-fa8c91bbebdd?w=400' },
    { name: 'Customized Gifting', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400' },
    { name: 'Wedding', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400' },
  ];

  // -------------------- Fetch Categories & User --------------------
  useEffect(() => {
    fetchCategories();
    checkUser();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category/all");
      setCategories(res.data.categories || res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProductsByCategory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product/category/${id}`);
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  const checkUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
      const loggedInUser = res.data.user || res.data;
      setUser(loggedInUser);
      fetchCartCount(loggedInUser._id);
    } catch {
      setUser(null);
      setCartCount(0);
    }
  };

  const fetchCartCount = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`, { withCredentials: true });
      const cartItems = res.data.items || [];
      const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartCount(0);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setCartCount(0);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-white font-sans text-[#003848]">
      {/* Top Bar */}
      <div className="bg-[#8b1d41] text-white text-center py-2 text-sm font-medium">
        Free shipping on orders ₹1500 & above 🚚
      </div>

      {/* Header */}
      <header className="px-8 py-4 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <img src={logo} alt="Logo" className="h-10 w-25" />

          {/* Search */}
          <div className="flex-grow flex items-center max-w-2xl bg-[#f2f4f5] rounded-lg px-4 py-2 border border-gray-200">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-300 text-sm">
              <span>All</span> <ChevronDown size={14} />
            </div>
            <input
              type="text"
              placeholder="Search for anything"
              className="bg-transparent w-full px-4 outline-none text-sm"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* User & Cart */}
          <div className="flex items-center gap-6 text-gray-700">
            {user ? (
              <div
                onClick={handleLogout}
                className="w-8 h-8 rounded-full bg-[#003848] text-white flex items-center justify-center cursor-pointer"
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User size={22} className="cursor-pointer" onClick={() => window.location.href = "/login"} />
            )}

            <div className="relative cursor-pointer" onClick={() => window.location.href = "/cart"}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#003848] text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="max-w-7xl mx-auto mt-6 flex items-center justify-between text-[15px] font-medium">
          <div className="flex gap-8 items-center">
            {/* Shop All */}
            <DropdownShopAll
              categories={categories}
              products={products}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              fetchProductsByCategory={fetchProductsByCategory}
              setProducts={setProducts}
            />

            {/* Hampers */}
            <DropdownMenu label="Hampers" items={['Mithai Box', 'Chocolate Hamper', 'Party Packs']} activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />

            {/* Customised Gifting */}
            <CustomisedGiftingDropdown activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} gifts={customizedGifts} />
          </div>

          <div className="flex gap-8 text-gray-500 font-normal">
            <span className="cursor-pointer hover:text-[#003848]">Our Stores</span>
            <span className="cursor-pointer hover:text-[#003848]">About Us</span>
            <span className="cursor-pointer hover:text-[#003848]">Sweets Library</span>
            <span className="cursor-pointer hover:text-[#003848]">Blog</span>
          </div>
        </nav>

        {/* Ribbon */}
        <RibbonSection categories={ribbonCategories} />
      </header>
    </div>
  );
};

// -------------------- Sub Components --------------------

const DropdownShopAll = ({ categories, products, activeDropdown, setActiveDropdown, activeCategory, setActiveCategory, fetchProductsByCategory, setProducts }) => (
  <div
    className="py-2 relative"
    onMouseEnter={() => setActiveDropdown('shopall')}
    onMouseLeave={() => {
      setActiveDropdown(null);
      setProducts([]); // reset products
    }}
  >
    <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'shopall' ? 'text-[#8b1d41]' : ''}`}>
      Shop All <ChevronDown size={14} />
    </span>

    <AnimatePresence>
      {activeDropdown === 'shopall' && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute left-0 top-full w-[95vw] max-w-[1200px] bg-[#003848] text-white z-50 shadow-2xl flex border-t border-[#ffffff1a] rounded-b-xl overflow-hidden"
          >
            {/* Categories */}
            <div className="w-1/4 border-r border-[#ffffff1a] py-6 px-6 bg-[#002d3a] min-h-[300px]">
              {categories.length > 0 ? (
                categories.map(cat => (
                  <div
                    key={cat._id}
                    onMouseEnter={() => {
                      setActiveCategory(cat._id);
                      fetchProductsByCategory(cat._id);
                    }}
                    className="flex items-center justify-between py-3 pr-4 hover:bg-[#ffffff0d] cursor-pointer group rounded-l-lg transition-all"
                  >
                    <span className="text-sm font-semibold uppercase opacity-80 group-hover:opacity-100">
                      {cat.name}
                    </span>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                ))
              ) : (
                <span className="text-sm opacity-50">No categories</span>
              )}
            </div>

            {/* Products */}
            <div className="w-3/4 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex flex-col gap-2 group cursor-pointer"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-inner">
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="text-[13px] font-medium leading-snug group-hover:text-gray-300">{item.name}</h4>
                  </motion.div>
                ))
              ) : (
                <span className="text-white col-span-4 text-center opacity-50">No products</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[100px] bg-black/30 backdrop-blur-sm z-40"
          />
        </>
      )}
    </AnimatePresence>
  </div>
);

const DropdownMenu = ({ label, items, activeDropdown, setActiveDropdown }) => (
  <div
    className="relative py-2 cursor-pointer"
    onMouseEnter={() => setActiveDropdown(label.toLowerCase())}
    onMouseLeave={() => setActiveDropdown(null)}
  >
    <span className={`flex items-center gap-1 transition-colors ${activeDropdown === label.toLowerCase() ? 'text-[#8b1d41]' : ''}`}>
      {label} <ChevronDown size={14} />
    </span>
    <AnimatePresence>
      {activeDropdown === label.toLowerCase() && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 z-50 rounded-md py-2 text-[#003848]"
        >
          {items.map(item => <div key={item} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">{item}</div>)}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const CustomisedGiftingDropdown = ({ activeDropdown, setActiveDropdown, gifts }) => (
  <div className="py-2 relative" onMouseEnter={() => setActiveDropdown('custom')} onMouseLeave={() => setActiveDropdown(null)}>
    <span className={`flex items-center gap-1 cursor-pointer transition-colors ${activeDropdown === 'custom' ? 'text-[#8b1d41]' : ''}`}>
      Customised Gifting <ChevronDown size={14} />
    </span>
    <AnimatePresence>
      {activeDropdown === 'custom' && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-0 top-full w-full bg-[#003848] text-white z-50 shadow-2xl p-10"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-5 gap-6">
              {gifts.map((gift, idx) => (
                <motion.div key={gift.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group cursor-pointer">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-[#ffffff1a]">
                    <img src={gift.img} alt={gift.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <h3 className="text-sm font-medium group-hover:underline decoration-1 underline-offset-4">{gift.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="fixed inset-0 top-[145px] bg-black/20 backdrop-blur-sm -z-10" />
        </>
      )}
    </AnimatePresence>
  </div>
);

const RibbonSection = ({ categories }) => (
  <section className="bg-[#fdfaf4] py-8">
    <div className="max-w-[1400px] mx-auto px-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        {categories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center gap-3 group cursor-pointer w-[110px]">
            <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8b1d41] transition-all duration-300 shadow-md">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-[13px] font-bold text-center leading-tight transition-colors group-hover:text-[#8b1d41]">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Navbar;