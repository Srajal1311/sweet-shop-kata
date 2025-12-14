'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSweetById, updateSweet } from '../../../services/sweetService';

export default function EditSweetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // state to include image
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const data = await getSweetById(id);
        setFormData({
          name: data.name,
          category: data.category,
          price: data.price.toString(),
          quantity: data.quantity.toString(),
          // Load existing image (or empty string if none)
          image: data.image || ''
        });
      } catch (err) {
        alert('Error loading sweet');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSweet();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSweet(id, {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });
      
      router.push('/');
    } catch (err) {
      alert('Failed to update sweet');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Edit Sweet</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-gray-400 mb-2">Sweet Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-400 mb-2">Category</label>
          <input name="category" value={formData.category} onChange={handleChange} required
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
          />
        </div>

        {/* 👇 3. NEW: Image URL Input */}
        <div>
          <label className="block text-gray-400 mb-2">Image URL (Optional)</label>
          <input 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none placeholder-gray-600" 
            placeholder="https://example.com/sweet-image.jpg" 
          />
          <p className="text-xs text-gray-500 mt-1">Paste a link from Google Images here.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label className="block text-gray-400 mb-2">Price (₹)</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-400 mb-2">Quantity</label>
            <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-yellow-500 outline-none" 
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-transform transform active:scale-95">
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}