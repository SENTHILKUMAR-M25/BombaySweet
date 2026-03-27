import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  ChevronRight, 
  Search, 
  Bell, 
  LogOut 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'category', label: 'Category', icon: <ChevronRight size={20} /> },
    { id: 'product', label: 'Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfaf4] font-sans text-[#003848]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003848] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-[#ffffff1a]">
          <h1 className="text-xl font-black italic uppercase leading-none tracking-tighter">
            Bombay <span className="block text-[10px] font-normal not-italic tracking-widest mt-1 uppercase">Admin Panel</span>
          </h1>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm font-bold uppercase tracking-widest ${
                activeTab === item.id 
                ? 'bg-[#8b1d41] text-white shadow-lg' 
                : 'hover:bg-[#ffffff0d] text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </div>
              {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#ffffff1a]">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center bg-[#f2f4f5] rounded-lg border border-gray-200 w-96 px-4 py-2">
            <input 
              type="text" 
              placeholder="Search data..." 
              className="bg-transparent w-full outline-none text-sm placeholder:text-gray-400"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-600 hover:text-[#003848]">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-[#8b1d41] w-2 h-2 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-tight">Admin User</p>
                <p className="text-[10px] text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#003848] flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <div className="p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold font-serif capitalize">{activeTab}</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your store {activeTab} information here.</p>
            </div>
            {activeTab === 'product' && (
              <button className="bg-[#8b1d41] text-white px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#6e1734] transition-all">
                Add New Product
              </button>
            )}
          </div>

          {/* Placeholder Grid for Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: '₹4,25,000', color: 'text-green-600' },
              { label: 'Active Orders', value: '128', color: 'text-[#8b1d41]' },
              { label: 'Total Users', value: '1,042', color: 'text-[#003848]' },
              { label: 'Avg. Rating', value: '4.9/5', color: 'text-yellow-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Table Placeholder */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold uppercase text-xs tracking-widest">Recent Activity</h3>
              <button className="text-[#8b1d41] text-[10px] font-bold uppercase border-b border-[#8b1d41]">View All</button>
            </div>
            <div className="p-12 text-center text-gray-400 text-sm italic">
              Table data for {activeTab} will be rendered here...
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;