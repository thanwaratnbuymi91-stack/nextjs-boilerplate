import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Marketplace",
  description: "ตลาดนัดซื้อขายสินค้าสำหรับนักศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}