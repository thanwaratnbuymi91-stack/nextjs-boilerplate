'use client';

import { useState } from 'react';
import ThreeDCard, { Product } from '@/components/ThreeDCard';
import FloatingNav from '@/components/FloatingNav';
import { useTheme } from '@/context/ThemeContext';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'หนังสือเรียน Python 3D',
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
    name: 'เสื้อช็อปวิทยาลัย (Cyber Blue)',
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
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-8 pb-32 relative">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center py-5 mb-8 border-b border-sky-500/20">
          <h1 className="text-2xl font-black text-sky-400">UNIMARKET 3D</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((item) => (
            <ThreeDCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <FloatingNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}