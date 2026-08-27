'use client';

import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium transition-all"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

const mockProducts = [
  { id: 1, name: 'หนังสือเรียน Python', price: '150 ฿', seller: 'คณะวิศวะ', tag: 'มือสอง' },
  { id: 2, name: 'เสื้อช็อปไซส์ L', price: '250 ฿', seller: 'คณะช่างอุต', tag: 'สภาพดี' },
  { id: 3, name: 'หูฟัง Bluetooth', price: '300 ฿', seller: 'คณะบริหาร', tag: 'ใหม่' },
];

export default function HomeRoutePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-4">
      {/* Header */}
      <header className="flex justify-between items-center py-3 mb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">UniMarket 🛒</h1>
        <ThemeToggle />
      </header>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="ค้นหาสินค้าในวิทยาลัย..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">รายการแนะนำ</h2>
          <span className="text-xs opacity-60">ทั้งหมด ({mockProducts.length})</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockProducts.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition hover:shadow-md"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <div className="h-36 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                <span>[ รูปภาพสินค้า ]</span>
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{item.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs opacity-70 mb-3">ผู้ขาย: {item.seller}</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.price}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition">
                  ติดต่อซื้อ
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}