import api from '../lib/axios';
import { Sweet } from '../types';

export const getSweets = async (): Promise<Sweet[]> => {
  const response = await api.get('/sweets'); // This calls http://localhost:5000/api/v1/sweets
  return response.data;
};
export const deleteSweet = async (id: string) => {
  await api.delete(`/sweets/${id}`);
};
// ... existing imports/code ...

// 👇 Get one sweet by ID
export const getSweetById = async (id: string): Promise<Sweet> => {
  const response = await api.get(`/sweets/${id}`);
  return response.data;
};

// 👇 Update sweet
export const updateSweet = async (id: string, data: Partial<Sweet>) => {
  const response = await api.put(`/sweets/${id}`, data);
  return response.data;
};
// ... updateSweet ...

// 👇 NEW: Purchase function
export const purchaseSweet = async (id: string) => {
  const response = await api.post(`/sweets/${id}/purchase`);
  return response.data;
};