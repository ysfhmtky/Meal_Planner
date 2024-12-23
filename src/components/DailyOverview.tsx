import { Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import type { DailyMeals, Meal } from '../types';
import { AddMealForm } from './AddMealForm';

interface DailyOverviewProps {
  meals: DailyMeals;
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
  onUpdateMeal: (type: keyof DailyMeals, meal: Meal) => void;
  onDeleteMeal: (type: keyof DailyMeals) => void;
}

export function DailyOverview({ meals, onAddMeal, onUpdateMeal, onDeleteMeal }: DailyOverviewProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Günlük Öğünler</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="text-emerald-600" size={24} />
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => (
          <div key={mealType} className="border-b pb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700">
                {mealType === 'breakfast' ? 'Kahvaltı' : 
                 mealType === 'lunch' ? 'Öğle Yemeği' : 'Akşam Yemeği'}
              </h3>
              {meals[mealType] && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateMeal(mealType, meals[mealType]!)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteMeal(mealType)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              {meals[mealType]?.name || 'Henüz planlanmadı'}
            </p>
            {meals[mealType] && (
              <p className="text-sm text-gray-500">
                {meals[mealType]?.calories} kcal
              </p>
            )}
          </div>
        ))}
      </div>

      {showAddForm && (
        <AddMealForm
          onAdd={onAddMeal}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}