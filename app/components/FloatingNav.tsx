'use client';

import React from 'react';

interface FloatingNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FloatingNav({ activeTab, setActiveTab }: FloatingNavProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-sky-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.9)] flex items-center gap-3">
      {[
        { id: 'home', label: 'หน้าหลัก', icon: '🏠' },
        { id: '3d', label: '3D Showcase', icon: '💎' },
        { id: 'cart', label: 'ตะกร้า', icon: '🛒' },
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
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}