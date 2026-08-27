'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import './globals.css';

type Theme = 'light' | 'dark';

interface StoreContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useTheme must be used within StoreProvider');
  }
  return context;
}

export function useStore() {
  return useTheme();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <html lang="th" className="light">
      <body className="bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-zinc-100 min-h-screen font-sans transition-colors duration-500 antialiased">
        <StoreContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </StoreContext.Provider>
      </body>
    </html>
  );
}