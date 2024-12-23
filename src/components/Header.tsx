import { Menu } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-emerald-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-emerald-700 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Yemek Planlayıcı</h1>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-block">Hoş Geldiniz</span>
        </div>
      </div>
    </header>
  );
}