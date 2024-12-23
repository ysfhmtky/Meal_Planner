import React from 'react';
import type { WeeklyPlan } from '../types';

interface WeeklyCalendarProps {
  weeklyPlan: WeeklyPlan;
  onDaySelect: (day: string) => void;
}

export function WeeklyCalendar({ weeklyPlan, onDaySelect }: WeeklyCalendarProps) {
  const days = [
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
    'Pazar',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Haftalık Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((day) => (
          <div
            key={day}
            onClick={() => onDaySelect(day)}
            className="border rounded-lg p-4 cursor-pointer hover:bg-emerald-50 transition-colors"
          >
            <h3 className="font-medium text-emerald-700 mb-2">{day}</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Kahvaltı:</span>{' '}
                {weeklyPlan[day]?.breakfast?.name || '-'}
              </p>
              <p>
                <span className="font-medium">Öğle:</span>{' '}
                {weeklyPlan[day]?.lunch?.name || '-'}
              </p>
              <p>
                <span className="font-medium">Akşam:</span>{' '}
                {weeklyPlan[day]?.dinner?.name || '-'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}