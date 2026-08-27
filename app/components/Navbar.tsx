'use client';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* โลโก้ */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            C
          </div>
          <span className="text-lg font-black text-slate-800 dark:text-white hidden sm:block tracking-wide">
            CAMPUS<span className="text-orange-500">MARKET</span>
          </span>
        </div>

        {/* แถบค้นหาสำหรับหน้าจอคอมพิวเตอร์ */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาสินค้า, ตำราเรียน, อุปกรณ์หอพัก..."
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 pl-10 pr-24 py-2.5 rounded-full text-sm outline-none border border-transparent focus:border-orange-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <button 
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full transition cursor-pointer"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/* ปุ่มสลับธีม + ปุ่มเข้าสู่ระบบ */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105 transition cursor-pointer"
            title="สลับโหมด"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button
            onClick={onOpenLogin}
            type="button"
            className="bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition shadow-md cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>
        </div>

      </div>
    </header>
  );
}