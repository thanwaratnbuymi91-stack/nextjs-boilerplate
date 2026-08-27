'use client';
import { useState } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import ThreeDCard from './components/ThreeDCard';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  reviews?: number;
  image: string;
  badge?: string;
}

const mockProducts: Product[] = [
  { 
    id: 1, 
    name: 'GUC กระเป๋าสะพายข้าง ทรงสวยจุของได้เยอะ หนังนุ่มพรีเมียม', 
    price: 149, 
    originalPrice: 390, 
    discount: '-61%', 
    rating: 4.9, 
    reviews: 120, 
    badge: 'LUXE',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    name: 'เสื้อช็อปนักศึกษา ผ้าคอมทวิวเนื้อดี ใส่สบาย ไม่ร้อน', 
    price: 250, 
    originalPrice: 450, 
    discount: '-44%', 
    rating: 5.0, 
    reviews: 85, 
    badge: 'RECOMMENDED',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    name: 'หูฟังไร้สาย Bluetooth 5.3 ตัดเสียงรบกวน เบสหนัก', 
    price: 399, 
    originalPrice: 1290, 
    discount: '-69%', 
    rating: 4.8, 
    reviews: 240, 
    badge: 'HOT',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 4, 
    name: 'กระเป๋าเป้นักศึกษา ช่องเยอะ กันน้ำ สายสะพายนุ่มซัพพอร์ตไหล่', 
    price: 290, 
    originalPrice: 590, 
    discount: '-50%', 
    rating: 4.9, 
    reviews: 64, 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' 
  },
];

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner แนวนอน */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-sky-500/20 p-8 sm:p-14 text-white shadow-2xl shadow-sky-950/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
          
          <div className="space-y-4 text-center sm:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full inline-block">
              CAMPUS EXCLUSIVE SELECTION
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              ศูนย์รวมสินค้า <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300">และอุปกรณ์ระดับพรีเมียม</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400">แพลตฟอร์มซื้อ-ขายสินค้าคุณภาพสำหรับนักศึกษาโดยเฉพาะ</p>
          </div>

          <button 
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="z-10 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/25 transition-all cursor-pointer text-sm whitespace-nowrap tracking-wider"
          >
            เริ่มลงขายสินค้า
          </button>
        </div>

        {/* หัวข้อสินค้า */}
        <div className="flex justify-between items-center pt-4">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full inline-block"></span>
            สินค้าแนะนำไฮไลต์
          </h2>
        </div>

        {/* Grid สินค้าแนวนอน */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockProducts.map((item) => (
            <ThreeDCard key={item.id} item={item} />
          ))}
        </div>

      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}