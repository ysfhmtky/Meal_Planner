import type { DailyMeals } from '../types';

export function calculateDailyNutrition(meals: DailyMeals) {
  const initialValues = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  return Object.values(meals).reduce((total, meal) => {
    if (!meal) return total;
    
    return {
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
    };
  }, initialValues);
}