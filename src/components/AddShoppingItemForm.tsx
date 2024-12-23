import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { ShoppingItem } from '../types';

interface AddShoppingItemFormProps {
  onAdd: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
  onClose: () => void;
}

export function AddShoppingItemForm({ onAdd, onClose }: AddShoppingItemFormProps) {
  const [item, setItem] = useState({
    name: '',
    category: 'Sebze',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(item);
    onClose();
  };

  const categories = ['Sebze', 'Meyve', 'Protein', 'Süt Ürünleri', 'Tahıl', 'Diğer'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alışveriş Listesine Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ürün Adı</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              value={item.category}
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              className="w-full border rounded-lg p-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white rounded-lg p-2 hover:bg-emerald-700"
          >
            Ekle
          </button>
        </form>
      </div>
    </div>
  );
}