'use client';

import { useState } from 'react';
import ThreeDCard, { Product } from '@/components/ThreeDCard';
import FloatingNav from '@/components/FloatingNav';
import ThemeToggle from '@/components/ThemeToggle';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'หนังสือเรียน Python 3D Immersive',
    price: 150,
    originalPrice: 220,
    rating: 4.9,
    reviews: 42,
    seller: 'คณะวิศวกรรมศาสตร์',
    tag: 'มือสอง',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'เสื้อช็อปวิทยาลัย (Crimson Red Edition)',
    price: 250,
    originalPrice: 350,
    rating: 4.8,
    reviews: 128,
    seller: 'คณะเทคโนโลยีอุตสาหกรรม',
    tag: 'สภาพดี',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'หูฟังไร้สาย Spatial Sound 3D',
    price: 300,
    originalPrice: 590,
    rating: 5.0,
    reviews: 89,
    seller: 'คณะบริหารธุรกิจ',
    tag: 'ใหม่',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'เครื่องคิดเลขวิทยาศาสตร์ Quantum',
    price: 450,
    originalPrice: 600,
    rating: 4.7,
    reviews: 15,
    seller: 'คณะวิทยาศาสตร์',
    tag: 'สภาพดี',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-8 pb-32 relative overflow-hidden">
      {/* Background Crimson Atmosphere Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-red-600/15 via-rose-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center py-5 mb-8 border-b border-red-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-stone-900 flex items-center justify-center text-white shadow-lg shadow-red-600/40 animate-pulse">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-600 via-rose-500 to-red-400 bg-clip-text text-transparent">
                UNIMARKET 3D
              </h1>
              <p className="text-[10px] text-red-500/80 tracking-widest uppercase font-bold">Crimson Black Edition</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full border border-stone-300 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono tracking-tight transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 22.5D12 0 0 22.5h24z" />
              </svg>
              <span>vercel.com</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full border border-stone-300 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono tracking-tight transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github.com</span>
            </a>

            <ThemeToggle />
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="ค้นหาไอเทมด้วย 3D Spatial Search..."
            className="w-full px-6 py-4 rounded-2xl border border-red-500/30 bg-white/50 dark:bg-stone-900/50 backdrop-blur-xl text-base focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all duration-300 shadow-xl placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
        </div>

        {/* Product Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((item) => (
            <ThreeDCard key={item.id} item={item} />
          ))}
        </main>
      </div>

      <FloatingNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}