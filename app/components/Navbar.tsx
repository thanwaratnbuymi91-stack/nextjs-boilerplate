'use client';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* โลโก้ */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 bg-gradient-to-tr from-sky-600 via-blue-500 to-amber-300 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-all duration-300">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-white leading-none">
              CAMPUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300">LUXE</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-semibold">Premium Marketplace</span>
          </div>
        </div>

        {/* แถบค้นหาสำหรับคอมพิวเตอร์ */}
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาสินค้าแบรนด์เนม, อุปกรณ์ระดับพรีเมียม..."
              className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 pl-11 pr-28 py-3 rounded-2xl text-sm outline-none border border-slate-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <button 
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md shadow-sky-500/20 cursor-pointer"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/* ปุ่มสลับธีม + ปุ่มเข้าสู่ระบบ */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button
            onClick={onOpenLogin}
            type="button"
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:opacity-95 text-slate-950 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer tracking-wider"
          >
            เข้าสู่ระบบ
          </button>
        </div>

      </div>
    </header>
  );
}