'use client';

import { useEffect, useState } from 'react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  tag: string;
  category: string;
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'หนังสือเรียน Python 3D Immersive',
    price: 150,
    seller: 'คณะวิศวกรรมศาสตร์',
    tag: 'มือสอง',
    category: 'หนังสือ',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'หนังสือพื้นฐาน Python สภาพดี 95% พร้อมระบบตัวอย่างโค้ด 3D',
  },
  {
    id: 2,
    name: 'เสื้อช็อปวิทยาลัย (Cyber Blue Edition)',
    price: 250,
    seller: 'คณะเทคโนโลยีอุตสาหกรรม',
    tag: 'สภาพดี',
    category: 'เสื้อผ้า',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อช็อปเนื้อผ้าหนา ทนทาน ปักโลโก้สีฟ้าพรีเมียมพิเศษ',
  },
  {
    id: 3,
    name: 'หูฟังไร้สาย Spatial Sound 3D',
    price: 300,
    seller: 'คณะบริหารธุรกิจ',
    tag: 'ใหม่',
    category: 'ไอที',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'หูฟังบลูทูธ มิติเสียง 3D ทรงพลัง ตัดเสียงรบกวนสมบูรณ์แบบ',
  },
  {
    id: 4,
    name: 'เครื่องคิดเลขวิทยาศาสตร์ Quantum',
    price: 450,
    seller: 'คณะวิทยาศาสตร์',
    tag: 'สภาพดี',
    category: 'ไอที',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?auto=format&fit=crop&w=600&q=80',
    description: 'เครื่องคิดเลขสำหรับคำนวณสูตรเชิงซ้อนระดับสูง',
  },
];

// --- Theme Toggle Button (Cool Blue Theme) ---
function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative px-5 py-2.5 rounded-full border border-sky-500/40 bg-sky-500/10 backdrop-blur-md hover:bg-sky-500/20 text-sky-400 text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)]"
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

// --- Interactive 3D Card (Blue Glowing Effects) ---
function ProductCard3D({ item }: { item: Product }) {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')}
      style={{
        transform,
        transition: 'transform 0.15s ease-out',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
      }}
      className="group relative p-6 rounded-3xl border border-sky-500/20 hover:border-sky-400/60 backdrop-blur-xl shadow-xl hover:shadow-[0_10px_35px_rgba(14,165,233,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Dynamic 3D Immersive Blue Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"
        style={{
          background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(56, 189, 248, 0.25), transparent 45%)`,
        }}
      />

      <div className="relative z-0">
        <div className="h-48 w-full rounded-2xl mb-5 overflow-hidden border border-sky-500/20 group-hover:border-sky-400/50 transition-all">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold tracking-wider uppercase">
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">ผู้ขาย: {item.seller}</p>
      </div>

      <div className="relative z-0 flex justify-between items-center pt-4 border-t border-sky-500/20">
        <span className="text-xl font-black bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {item.price} ฿
        </span>
        <button className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 active:scale-95">
          Buy Now
        </button>
      </div>
    </div>
  );
}

// --- Main Interactive Page ---
export default function ImmersivePage() {
  const [activeTab, setActiveTab] = useState('3d');

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-8 selection:bg-sky-500/30 pb-32 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Blue Aurora Glow Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-sky-500/20 via-blue-600/10 to-transparent blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-5 mb-8 border-b border-sky-500/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-sky-500/40 animate-pulse">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                UNIMARKET 3D
              </h1>
              <p className="text-[10px] text-sky-400/80 tracking-widest uppercase font-bold">Cyber Blue Edition</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Vercel & GitHub External Deployment Links */}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-mono tracking-tight transition-all flex items-center gap-1.5 shadow-sm"
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
              className="px-3.5 py-2 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs font-mono tracking-tight transition-all flex items-center gap-1.5 shadow-sm"
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
            className="w-full px-6 py-4 rounded-2xl border border-sky-500/30 bg-slate-900/50 backdrop-blur-xl text-base text-slate-100 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30 transition-all duration-300 shadow-xl placeholder:text-slate-500"
          />
        </div>

        {/* Main 3D Grid Showcase */}
        <main className="flex-1 space-y-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-100">3D Immersive Showcase</h2>
              <p className="text-xs text-sky-400/80 mt-1 uppercase tracking-widest font-semibold">
                Interactive Elements & Blue Glow Effect
              </p>
            </div>
            <span className="text-xs px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 font-medium">
              4 Items Loaded
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {mockProducts.map((item) => (
              <ProductCard3D key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>

      {/* Experimental Floating Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-sky-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex items-center gap-3">
        {[
          { id: '3d', label: '3D Elements', icon: '💎' },
          { id: 'nav', label: 'Experimental Nav', icon: '🚀' },
          { id: 'dark', label: 'Dark Mode', icon: '🌙' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}