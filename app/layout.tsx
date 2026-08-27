import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import FloatingNav from './components/FloatingNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="dark">
      <body className="min-h-screen antialiased pb-24">
        <ThemeProvider>
          <main className="max-w-md mx-auto p-4">
            {children}
          </main>
          <FloatingNav />
        </ThemeProvider>
      </body>
    </html>
  );
}