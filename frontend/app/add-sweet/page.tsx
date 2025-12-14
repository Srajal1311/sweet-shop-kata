'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/axios';

export default function AddSweetPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      await api.post('/sweets', {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });
      
     
      router.push('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add sweet');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Add New Sweet</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-gray-400 mb-2">Sweet Name</label>
          <input name="name" onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            placeholder="e.g. Kaju Katli" 
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-400 mb-2">Category</label>
          <input name="category" onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            placeholder="e.g. Cashew Sweets" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-gray-400 mb-2">Price (₹)</label>
            <input name="price" type="number" onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-400 mb-2">Quantity</label>
            <input name="quantity" type="number" onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded transition-transform transform active:scale-95">
          🚀 Launch Sweet
        </button>
      </form>
    </div>
  );
}