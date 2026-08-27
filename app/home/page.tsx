'use client';

import { useState } from 'react';
import { useTheme } from '../layout';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  seller: string;
  tag: string;
  image: string;
}

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

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

function ThreeDCard({ item }: { item: Product }) {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')}
      style={{
        transform,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative p-5 rounded-3xl border border-red-500/20 hover:border-red-600/60 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-xl hover:shadow-[0_10px_35px_rgba(220,38,38,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"
        style={{
          background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(220, 38, 38, 0.25), transparent 45%)`,
        }}
      />

      <div className="relative z-0">
        <div className="h-44 w-full rounded-2xl mb-4 overflow-hidden border border-red-500/20 group-hover:border-red-500/50 transition-all">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 font-semibold shrink-0 ml-2">
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">ผู้ขาย: {item.seller}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-500 dark:to-rose-400 bg-clip-text text-transparent">
            {item.price.toLocaleString()} ฿
          </span>
          {item.originalPrice && (
            <span className="text-xs text-stone-400 dark:text-stone-500 line-through">
              {item.originalPrice.toLocaleString()} ฿
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-red-500/15 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-amber-500 text-xs">★</span>
            <span className="font-bold text-stone-700 dark:text-stone-300">{item.rating || 5.0}</span>
          </div>
          <span className="text-[11px] text-stone-500 dark:text-stone-400">
            ขายแล้ว {item.reviews || 0} ชิ้น
          </span>
        </div>
      </div>
    </div>
  );
}

function FloatingNav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-stone-900/90 dark:bg-stone-950/90 backdrop-blur-2xl border border-red-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3">
      {[
        { id: 'home', label: 'หน้าหลัก', icon: '🏠' },
        { id: '3d', label: '3D Showcase', icon: '💎' },
        { id: 'cart', label: 'ตะกร้าสินค้า', icon: '🛒' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-105'
              : 'text-stone-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-8 pb-32 relative overflow-hidden">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-red-600/15 via-rose-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
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
            <ThemeToggle />
          </div>
        </header>

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