export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
  image?: string;
}

export interface DailyMeals {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export interface WeeklyPlan {
  [key: string]: DailyMeals; // pazartesi, sali, etc.
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

export interface NutritionalGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}