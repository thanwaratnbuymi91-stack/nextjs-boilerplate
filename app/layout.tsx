import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'UNIMARKET 3D - Luxury Black & Red',
  description: 'Immersive Dark Mode Marketplace Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="dark">
      <body className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}