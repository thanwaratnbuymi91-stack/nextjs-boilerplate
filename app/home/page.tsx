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
      className="px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm hover:shadow-amber-500/20"
    >
      {theme === 'light' ? '🌙 Dark Luxe' : '☀️ Light Luxe'}
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
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-8 selection:bg-amber-500/30">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-5 mb-8 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-300 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              UNIMARKET
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Search Bar */}
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="ค้นหาสินค้าพรีเมียมในวิทยาลัย..."
            className="w-full px-6 py-4 rounded-2xl border border-amber-500/30 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 shadow-sm placeholder:text-stone-400"
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">คอลเลกชันแนะนำ</h2>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1 uppercase tracking-widest font-semibold">
                Curated Selection
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 font-medium">
              ทั้งหมด {mockProducts.length} รายการ
            </span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {mockProducts.map((item) => (
              <div
                key={item.id}
                className="group relative p-6 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <div>
                  <div className="h-48 bg-stone-100 dark:bg-stone-900/80 rounded-2xl mb-5 flex items-center justify-center border border-stone-200/50 dark:border-stone-800/50 group-hover:border-amber-500/20 transition-all">
                    <span className="text-xs tracking-wider text-stone-400 uppercase font-medium">[ Product Image ]</span>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold tracking-wider uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 mb-4">ผู้ขาย: {item.seller}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="text-xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                    {item.price}
                  </span>
                  <button className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md shadow-amber-600/20 transition-all duration-300 hover:scale-105 active:scale-95">
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