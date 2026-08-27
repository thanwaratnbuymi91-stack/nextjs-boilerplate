import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Marketplace Luxe",
  description: "ตลาดนัดซื้อขายสินค้าระดับพรีเมียมสำหรับนักศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen w-full bg-slate-950 text-slate-100">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}