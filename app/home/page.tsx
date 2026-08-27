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

// 3D Card Component with Interactive Hover & Tilt effect
function ProductCard3D({ item }: { item: any }) {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.15s ease-out',
        backgroundColor: 'var(--card-bg)',
      }}
      className="group relative p-5 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Dynamic Immersive Lighting Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-10"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(245, 158, 11, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-0">
        {/* Product Image Container with 3D Depth */}
        <div className="h-48 w-full bg-stone-100 dark:bg-stone-900/80 rounded-2xl mb-5 overflow-hidden border border-stone-200/50 dark:border-stone-800/50 group-hover:border-amber-500/30 transition-all relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold tracking-wider uppercase shrink-0 ml-2">
            {item.tag}
          </span>
        </div>
        <p className="text-xs opacity-60 mb-4">ผู้ขาย: {item.seller}</p>
      </div>

      <div className="relative z-0 flex justify-between items-center pt-4 border-t border-stone-100 dark:border-stone-800/80">
        <span className="text-xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
          {item.price}
        </span>
        <button className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md shadow-amber-600/20 transition-all duration-300 hover:scale-105 active:scale-95">
          ติดต่อซื้อ
        </button>
      </div>
    </div>
  );
}

const mockProducts = [
  {
    id: 1,
    name: 'หนังสือเรียน Python 3D',
    price: '150 ฿',
    seller: 'คณะวิศวะ',
    tag: 'มือสอง',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'เสื้อช็อปไซส์ L',
    price: '250 ฿',
    seller: 'คณะช่างอุต',
    tag: 'สภาพดี',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'หูฟัง Bluetooth',
    price: '300 ฿',
    seller: 'คณะบริหาร',
    tag: 'ใหม่',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'เครื่องคิดเลขวิทยาศาสตร์',
    price: '450 ฿',
    seller: 'คณะวิทยาศาสตร์',
    tag: 'สภาพดี',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomeRoutePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-8 selection:bg-amber-500/30 pb-28">
      {/* Ambient Immersive Background Light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-5 mb-8 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center text-white shadow-lg shadow-amber-600/30 animate-pulse">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-300 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              UNIMARKET 3D
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Search Bar with Glassmorphism */}
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
                3D Immersive Selection
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 font-medium">
              ทั้งหมด {mockProducts.length} รายการ
            </span>
          </div>

          {/* Grid Layout with 3D Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {mockProducts.map((item) => (
              <ProductCard3D key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>

      {/* Experimental Floating Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-full bg-stone-900/80 dark:bg-stone-950/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-black/50 flex items-center gap-2 sm:gap-4 transition-all hover:border-amber-500/60">
        {[
          { id: 'home', label: 'หน้าหลัก', icon: '🏠' },
          { id: 'explore', label: 'ค้นพบ 3D', icon: '💎' },
          { id: 'cart', label: 'ตะกร้า', icon: '🛒' },
          { id: 'profile', label: 'บัญชี', icon: '👤' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-600/40 scale-105'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}