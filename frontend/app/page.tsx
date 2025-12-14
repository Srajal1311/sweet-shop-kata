'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSweets, deleteSweet, purchaseSweet } from '../services/sweetService';
import { Sweet } from '../types';

export default function Home() {
  const router = useRouter();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  
  //  1. Store the full user object (not just a boolean)
  const [user, setUser] = useState<any>(null); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // 2. Parse the user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      try {
        const data = await getSweets();
        setSweets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;
    try {
      await deleteSweet(id);
      setSweets(sweets.filter((sweet) => sweet._id !== id));
    } catch (err) {
      alert('Failed to delete. You might not be an admin.');
    }
  };

  const handlePurchase = async (id: string, name: string) => {
    try {
      await purchaseSweet(id);
      alert(`🎉 Yummy! You bought a ${name}!`);
      setSweets(sweets.map(s => s._id === id ? { ...s, quantity: s.quantity - 1 } : s));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  const filteredSweets = sweets.filter(sweet => 
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Helper variables
  const isLoggedIn = !!user;
  const isAdmin = user && user.role === 'admin';

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10 relative">
      
      {/* Login/Logout Section */}
      <div className="absolute top-6 right-10 z-20 flex items-center gap-4">
        {isLoggedIn && (
            <span className="text-gray-500 text-sm hidden sm:inline">
                Hi, {user.username} <span className="text-yellow-500">({user.role})</span>
            </span>
        )}
        
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Logout</button>
        ) : (
          <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">Login</Link>
        )}
      </div>

      <div className="flex flex-col items-center mb-10 space-y-6 mt-10">
        <h1 className="text-4xl font-bold text-yellow-400 text-center">
          🍬 The Sweet Shop
        </h1>

        {/* 4. ONLY SHOW 'ADD' IF ADMIN */}
        {isAdmin && (
          <Link href="/add-sweet" className="bg-gray-800 hover:bg-gray-700 text-yellow-400 px-8 py-3 rounded-full border border-yellow-500/30 transition-all shadow-lg hover:shadow-yellow-500/20 font-semibold">
            + Add New Sweet
          </Link>
        )}

        {/* Search Bar */}
        <div className="w-full max-w-md relative">
          <input 
            type="text" 
            placeholder="🔍 Search sweets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-white focus:border-yellow-500 outline-none shadow-inner"
          />
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredSweets.map((sweet) => (
            <div key={sweet._id} className="relative group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-500 transition-colors shadow-xl flex flex-col">
              
              <div className="h-48 w-full bg-gray-800 relative overflow-hidden">
                <img 
                  src={sweet.image || 'https://placehold.co/600x400/1f2937/fbbf24?text=Sweet'} 
                  alt={sweet.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-yellow-400 font-medium uppercase tracking-wider">
                  {sweet.category}
                </div>
              </div>

              {/*5. ONLY SHOW EDIT/DELETE IF ADMIN */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link href={`/edit-sweet/${sweet._id}`} className="text-white hover:text-blue-200 bg-black/50 hover:bg-blue-600/80 p-2 rounded-full backdrop-blur-sm transition-all">
                    ✏️
                  </Link>
                  <button onClick={() => handleDelete(sweet._id)} className="text-white hover:text-red-200 bg-black/50 hover:bg-red-600/80 p-2 rounded-full backdrop-blur-sm transition-all">
                    🗑️
                  </button>
                </div>
              )}

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{sweet.name}</h2>
                <div className="space-y-4 text-gray-400">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span>Price:</span>
                    <span className="text-yellow-200 font-mono text-lg">₹{sweet.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stock:</span>
                    <span className={`font-medium ${sweet.quantity < 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of Stock'}
                    </span>
                  </div>

                  {/* 6. BUY BUTTON: Visible for ALL Logged in users (User OR Admin) */}
                  {isLoggedIn && (
                    <button
                      onClick={() => handlePurchase(sweet._id, sweet.name)}
                      disabled={sweet.quantity === 0}
                      className={`w-full py-2 rounded-lg font-bold transition-all transform active:scale-95 ${
                        sweet.quantity > 0 
                          ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg hover:shadow-yellow-500/20' 
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {sweet.quantity > 0 ? '🛒 Buy Now' : '🚫 Sold Out'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredSweets.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10 text-xl">
              No sweets found matching "{searchQuery}" 🍪
            </p>
          )}
        </div>
      )}
    </main>
  );
}