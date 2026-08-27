'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-4xl">🛒</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Campus Marketplace</h1>
        <p className="text-sm opacity-70">แหล่งรวมสินค้าและบริการในวิทยาลัย</p>
        
        <div className="pt-8 flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
          <span className="text-xs opacity-60">กำลังเข้าสู่หน้าหลัก...</span>
        </div>
      </div>
    </main>
  );
}