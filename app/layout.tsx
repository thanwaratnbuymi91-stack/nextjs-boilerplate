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
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // สลับ attribute data-theme บน <html> ตามสีปัจจุบัน
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <html lang="th" data-theme={theme}>
      <body className="min-h-screen font-sans antialiased">
        <StoreContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </StoreContext.Provider>
      </body>
    </html>
  );
}