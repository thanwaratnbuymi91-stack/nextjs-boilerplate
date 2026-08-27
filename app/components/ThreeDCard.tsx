'use client';
import { useState } from 'react';

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

export default function ThreeDCard({ item }: { item: Product }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => setIsSelected(!isSelected)}
      className={`group relative bg-slate-900/70 hover:bg-slate-900 rounded-3xl overflow-hidden 
        transition-all duration-300 ease-out cursor-pointer select-none
        border ${isSelected ? 'border-sky-400 ring-4 ring-sky-500/30 scale-[1.02]' : 'border-slate-800/80 hover:border-sky-500/50'}
        shadow-lg hover:shadow-2xl hover:shadow-sky-950/60 hover:-translate-y-1.5 active:scale-95`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-amber-500/10 pointer-events-none z-10 animate-pulse" />
      )}

      {/* รูปภาพสินค้า */}
      <div className="relative w-full aspect-square bg-slate-950 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
        
        {item.discount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-lg shadow-sky-950/50 backdrop-blur-md group-hover:scale-105 transition-transform">
            {item.discount}
          </div>
        )}

        {item.badge && (
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl border border-amber-400/30 group-hover:border-amber-400/60 transition-colors">
            {item.badge}
          </div>
        )}

        {/* ไอคอนแสดงการเลือก */}
        {isSelected && (
          <div className="absolute bottom-3 right-3 z-20 bg-sky-500 text-slate-950 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-lg animate-bounce">
            ✓
          </div>
        )}
      </div>

      {/* ข้อความและรายละเอียด */}
      <div className="p-4 flex flex-col justify-between flex-1 relative z-10">
        <h2 className="text-sm font-semibold text-slate-200 line-clamp-2 leading-relaxed mb-3 group-hover:text-sky-300 transition-colors">
          {item.name}
        </h2>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
              ฿{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                ฿{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-xs">★</span>
              <span className="text-xs font-bold text-slate-300">{item.rating ?? 5.0}</span>
            </div>
            <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
              ขายแล้ว {item.reviews ?? 0} ชิ้น
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}