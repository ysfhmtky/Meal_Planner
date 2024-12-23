import { CheckCircle2, ShoppingCart, Trash2, Plus } from 'lucide-react';
import React, { useState } from 'react';
import type { ShoppingItem } from '../types';
import { AddShoppingItemForm } from './AddShoppingItemForm';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: Omit<ShoppingItem, 'id' | 'checked'>) => void;
}

export function ShoppingList({
  items,
  onToggleItem,
  onRemoveItem,
  onAddItem,
}: ShoppingListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Alışveriş Listesi</h2>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="text-emerald-600" size={24} />
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-medium text-lg mb-3">{category}</h3>
            <ul className="space-y-2">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className={`p-1 rounded-full ${
                          item.checked ? 'text-emerald-600' : 'text-gray-400'
                        }`}
                      >
                        <CheckCircle2 size={20} />
                      </button>
                      <span
                        className={`${
                          item.checked ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {showAddForm && (
        <AddShoppingItemForm
          onAdd={onAddItem}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}