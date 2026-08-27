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
      className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

const mockProducts = [
  { id: 1, name: 'หนังสือเรียน Python', price: '150 ฿', seller: 'คณะวิศวะ', tag: 'มือสอง' },
  { id: 2, name: 'เสื้อช็อปไซส์ L', price: '250 ฿', seller: 'คณะช่างอุต', tag: 'สภาพดี' },
  { id: 3, name: 'หูฟัง Bluetooth', price: '300 ฿', seller: 'คณะบริหาร', tag: 'ใหม่' },
  { id: 4, name: 'เครื่องคิดเลขวิทยาศาสตร์', price: '450 ฿', seller: 'คณะวิทยาศาสตร์', tag: 'สภาพดี' },
];

export default function HomeRoutePage() {
  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-6">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-4 mb-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">UniMarket 🛒</h1>
          <ThemeToggle />
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="ค้นหาสินค้าในวิทยาลัย..."
            className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">รายการแนะนำ</h2>
            <span className="text-sm opacity-60">ทั้งหมด ({mockProducts.length})</span>
          </div>

          {/* Grid Layout: Responsive 1 คอลัมน์บนมือถือ, 2 บนแท็บเล็ต, 3-4 บนคอมพิวเตอร์ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition hover:shadow-lg flex flex-col justify-between"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <div>
                  <div className="h-44 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 flex items-center justify-center text-gray-400 font-medium">
                    <span>[ รูปภาพสินค้า ]</span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mb-4">ผู้ขาย: {item.seller}</p>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{item.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
                    ติดต่อซื้อ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}