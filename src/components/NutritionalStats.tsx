import { Activity, Target } from 'lucide-react';
import React from 'react';
import type { NutritionalGoals } from '../types';

interface NutritionalStatsProps {
  current: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: NutritionalGoals;
}

export function NutritionalStats({ current, goals }: NutritionalStatsProps) {
  const calculatePercentage = (current: number, goal: number) =>
    Math.min(Math.round((current / goal) * 100), 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Besin Değerleri</h2>
        <Target className="text-emerald-600" size={24} />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Kalori</span>
            <span>{current.calories} / {goals.calories} kcal</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${calculatePercentage(current.calories, goals.calories)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Protein</span>
            <span>{current.protein}g / {goals.protein}g</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${calculatePercentage(current.protein, goals.protein)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Karbonhidrat</span>
            <span>{current.carbs}g / {goals.carbs}g</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${calculatePercentage(current.carbs, goals.carbs)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Yağ</span>
            <span>{current.fat}g / {goals.fat}g</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${calculatePercentage(current.fat, goals.fat)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}