'use client';

import React, { useState } from 'react';

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

export default function ThreeDCard({ item }: { item: Product }) {
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
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
      }}
      className="group relative p-5 rounded-3xl border border-sky-500/20 hover:border-sky-400/60 backdrop-blur-xl shadow-xl hover:shadow-[0_10px_35px_rgba(56,189,248,0.25)] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"
        style={{
          background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(56, 189, 248, 0.25), transparent 45%)`,
        }}
      />

      <div className="relative z-0">
        <div className="h-44 w-full rounded-2xl mb-4 overflow-hidden border border-sky-500/20 group-hover:border-sky-400/50 transition-all">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-bold text-base text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">{item.name}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold shrink-0 ml-2">
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3">ผู้ขาย: {item.seller}</p>

        {/* ราคาปัจจุบัน & ราคาเดิมขีดฆ่า */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
            {item.price.toLocaleString()} ฿
          </span>
          {item.originalPrice && (
            <span className="text-xs text-slate-500 line-through">
              {item.originalPrice.toLocaleString()} ฿
            </span>
          )}
        </div>

        {/* ดาวรีวิว และ จำนวนที่ขายแล้ว */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-sky-500/15 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="font-bold text-slate-300">{item.rating || 5.0}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            ขายแล้ว {item.reviews || 0} ชิ้น
          </span>
        </div>
      </div>
    </div>
  );
}