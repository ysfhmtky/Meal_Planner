import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import { DailyOverview } from './components/DailyOverview';
import { Header } from './components/Header';
import { NutritionalStats } from './components/NutritionalStats';
import { ShoppingList } from './components/ShoppingList';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { calculateDailyNutrition } from './utils/nutritionalCalculations';
import type { DailyMeals, Meal, NutritionalGoals, ShoppingItem, WeeklyPlan } from './types';

// Example data - In a real app, this would come from a backend
const initialWeeklyPlan: WeeklyPlan = {
  Pazartesi: {
    breakfast: {
      id: '1',
      name: 'Menemen',
      type: 'breakfast',
      calories: 350,
      protein: 15,
      carbs: 20,
      fat: 25,
      ingredients: ['Yumurta', 'Domates', 'Biber', 'Zeytinyağı'],
      instructions: 'Sebzeleri doğrayın ve yumurta ile pişirin.',
    },
  },
};

const initialShoppingItems: ShoppingItem[] = [
  { id: '1', name: 'Yumurta', category: 'Protein', checked: false },
  { id: '2', name: 'Domates', category: 'Sebze', checked: false },
  { id: '3', name: 'Ekmek', category: 'Tahıl', checked: true },
];

const nutritionalGoals: NutritionalGoals = {
  calories: 2000,
  protein: 100,
  carbs: 250,
  fat: 70,
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weeklyPlan, setWeeklyPlan] = useState(initialWeeklyPlan);
  const [shoppingItems, setShoppingItems] = useState(initialShoppingItems);
  const [selectedDay, setSelectedDay] = useState('Pazartesi');

  // Calculate daily nutritional totals
  const dailyNutrition = calculateDailyNutrition(weeklyPlan[selectedDay] || {});

  // Meal CRUD operations
  const handleAddMeal = (newMeal: Omit<Meal, 'id'>) => {
    const meal: Meal = { ...newMeal, id: crypto.randomUUID() };
    setWeeklyPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [meal.type]: meal,
      },
    }));
  };

  const handleUpdateMeal = (type: keyof DailyMeals, meal: Meal) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: meal,
      },
    }));
  };

  const handleDeleteMeal = (type: keyof DailyMeals) => {
    setWeeklyPlan((prev) => {
      const newDailyMeals = { ...prev[selectedDay] };
      delete newDailyMeals[type];
      return {
        ...prev,
        [selectedDay]: newDailyMeals,
      };
    });
  };

  // Shopping list CRUD operations
  const handleAddShoppingItem = (newItem: Omit<ShoppingItem, 'id' | 'checked'>) => {
    const item: ShoppingItem = {
      ...newItem,
      id: crypto.randomUUID(),
      checked: false,
    };
    setShoppingItems((prev) => [...prev, item]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DailyOverview
              meals={weeklyPlan[selectedDay] || {}}
              onAddMeal={handleAddMeal}
              onUpdateMeal={handleUpdateMeal}
              onDeleteMeal={handleDeleteMeal}
            />
            <WeeklyCalendar
              weeklyPlan={weeklyPlan}
              onDaySelect={setSelectedDay}
            />
          </div>

          <div className="space-y-8">
            <NutritionalStats
              current={dailyNutrition}
              goals={nutritionalGoals}
            />
            <ShoppingList
              items={shoppingItems}
              onToggleItem={toggleShoppingItem}
              onRemoveItem={removeShoppingItem}
              onAddItem={handleAddShoppingItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;