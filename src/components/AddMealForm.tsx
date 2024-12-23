import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Meal } from '../types';

interface AddMealFormProps {
  onAdd: (meal: Omit<Meal, 'id'>) => void;
  onClose: () => void;
}

export function AddMealForm({ onAdd, onClose }: AddMealFormProps) {
  const [meal, setMeal] = useState({
    name: '',
    type: 'breakfast' as const,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    ingredients: [''],
    instructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(meal);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Yeni Öğün Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Yemek Adı</label>
            <input
              type="text"
              value={meal.name}
              onChange={(e) => setMeal({ ...meal, name: e.target.value })}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Öğün Tipi</label>
            <select
              value={meal.type}
              onChange={(e) => setMeal({ ...meal, type: e.target.value as 'breakfast' | 'lunch' | 'dinner' })}
              className="w-full border rounded-lg p-2"
            >
              <option value="breakfast">Kahvaltı</option>
              <option value="lunch">Öğle Yemeği</option>
              <option value="dinner">Akşam Yemeği</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kalori</label>
              <input
                type="number"
                value={meal.calories}
                onChange={(e) => setMeal({ ...meal, calories: Number(e.target.value) })}
                className="w-full border rounded-lg p-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Protein (g)</label>
              <input
                type="number"
                value={meal.protein}
                onChange={(e) => setMeal({ ...meal, protein: Number(e.target.value) })}
                className="w-full border rounded-lg p-2"
                min="0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white rounded-lg p-2 hover:bg-emerald-700"
          >
            Öğün Ekle
          </button>
        </form>
      </div>
    </div>
  );
}