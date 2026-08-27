'use client';

import { useEffect, useState } from 'react';

// --- Type Definitions ---
interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  tag: string;
  category: string;
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'หนังสือเรียน Python 3D',
    price: 150,
    seller: 'คณะวิศวกรรมศาสตร์',
    tag: 'มือสอง',
    category: 'หนังสือ',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'หนังสือพื้นฐาน Python สภาพดี 95% ไม่มีรอยขีดเขียน เหมาะสำหรับนิสิตปี 1',
  },
  {
    id: 2,
    name: 'เสื้อช็อปวิทยาลัย ไซส์ L',
    price: 250,
    seller: 'คณะเทคโนโลยีอุตสาหกรรม',
    tag: 'สภาพดี',
    category: 'เสื้อผ้า',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อช็อปเนื้อผ้าหนา ทนทาน ซักสะอาดพร้อมใช้งาน ขนาดรอบอก 42 นิ้ว',
  },
  {
    id: 3,
    name: 'หูฟังไร้สาย Bluetooth',
    price: 300,
    seller: 'คณะบริหารธุรกิจ',
    tag: 'ใหม่',
    category: 'ไอที',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'หูฟังบลูทูธเสียงดี ตัดเสียงรบกวนได้ แบตเตอรี่อึดใช้งานได้ต่อเนื่อง 6 ชั่วโมง',
  },
  {
    id: 4,
    name: 'เครื่องคิดเลขวิทยาศาสตร์',
    price: 450,
    seller: 'คณะวิทยาศาสตร์',
    tag: 'สภาพดี',
    category: 'ไอที',
    image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e488?auto=format&fit=crop&w=600&q=80',
    description: 'เครื่องคิดเลข Casio คำนวณสูตรซับซ้อนได้ครบถ้วน สำหรับวิชาแคลคูลัสและสถิติ',
  },
];

// --- Theme Toggle Component ---
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs tracking-wider uppercase font-semibold transition-all shadow-sm"
    >
      {theme === 'light' ? '🌙 Dark Luxe' : '☀️ Light Luxe'}
    </button>
  );
}

// --- 3D Card Component ---
function ProductCard3D({
  item,
  onSelect,
  onAddToCart,
}: {
  item: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
}) {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      onClick={() => onSelect(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')}
      style={{ transform, transition: 'transform 0.15s ease-out', backgroundColor: 'var(--card-bg)' }}
      className="group relative p-5 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-10"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(245, 158, 11, 0.15), transparent 40%)`,
        }}
      />

      <div>
        <div className="h-48 w-full bg-stone-100 dark:bg-stone-900 rounded-2xl mb-5 overflow-hidden border border-stone-200/50 dark:border-stone-800/50 relative">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">{item.name}</h3>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold uppercase shrink-0 ml-2">{item.tag}</span>
        </div>
        <p className="text-xs opacity-60 mb-4">ผู้ขาย: {item.seller}</p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-stone-100 dark:border-stone-800">
        <span className="text-xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">{item.price} ฿</span>
        <button
          onClick={(e) => onAddToCart(item, e)}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          + ใส่ตะกร้า
        </button>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function HomeRoutePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Notification Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setCart((prev) => [...prev, product]);
    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว`);
  };

  // Filtering Logic
  const filteredProducts = mockProducts.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.seller.includes(searchTerm);
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-8 selection:bg-amber-500/30 pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-amber-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm animate-bounce">
          ✨ {toastMessage}
        </div>
      )}

      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-5 mb-8 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-300 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              UNIMARKET 3D
            </h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Tab 1: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Search & Category Filter */}
            <div className="mb-8 space-y-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาสินค้า หรือ คณะผู้ขาย..."
                className="w-full px-6 py-4 rounded-2xl border border-amber-500/30 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition shadow-sm"
              />

              <div className="flex gap-2 overflow-x-auto pb-2">
                {['ทั้งหมด', 'หนังสือ', 'เสื้อผ้า', 'ไอที'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'border border-amber-500/20 bg-amber-500/5 text-stone-600 dark:text-stone-300 hover:bg-amber-500/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <main className="flex-1 space-y-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">รายการสินค้า</h2>
                  <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1 uppercase font-semibold">3D Interactive Items</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 font-medium">
                  พบ {filteredProducts.length} รายการ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {filteredProducts.map((item) => (
                  <ProductCard3D key={item.id} item={item} onSelect={setSelectedProduct} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </main>
          </>
        )}

        {/* Tab 2: CART */}
        {activeTab === 'cart' && (
          <main className="flex-1 max-w-2xl mx-auto w-full space-y-6">
            <h2 className="text-2xl font-black">ตะกร้าสินค้าของฉัน ({cart.length})</h2>
            {cart.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-amber-500/30 rounded-3xl">
                <p className="opacity-60 text-lg">ยังไม่มีสินค้าในตะกร้า</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-stone-200 dark:border-stone-800" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-xs opacity-60">{item.seller}</p>
                        <p className="text-amber-600 font-bold text-sm">{item.price} ฿</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      className="text-red-500 text-xs px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10"
                    >
                      ลบ
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-amber-500/20 flex justify-between items-center">
                  <span className="text-lg font-bold">ราคารวมทั้งสิ้น:</span>
                  <span className="text-2xl font-black text-amber-600">{cart.reduce((sum, item) => sum + item.price, 0)} ฿</span>
                </div>
                <button
                  onClick={() => {
                    alert('ชำระเงินสำเร็จ! ขอบคุณที่สั่งซื้อ');
                    setCart([]);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold shadow-lg hover:scale-[1.01] transition"
                >
                  ดำเนินการสั่งซื้อ
                </button>
              </div>
            )}
          </main>
        )}

        {/* Tab 3: PROFILE */}
        {activeTab === 'profile' && (
          <main className="flex-1 max-w-md mx-auto w-full p-6 rounded-3xl border border-amber-500/20 text-center space-y-4" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-3xl shadow-lg text-white font-bold">
              🎓
            </div>
            <h3 className="text-xl font-bold">นักศึกษา วิทยาลัย</h3>
            <p className="text-xs opacity-60">รหัสผู้ขาย/ผู้ซื้อ: #STU-2026-88</p>
            <div className="pt-4 space-y-2 text-left text-sm">
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">📦 ประวัติการสั่งซื้อ: 2 รายการ</div>
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">🏪 ร้านค้าของฉัน: ยังไม่ได้ลงขายสินค้า</div>
            </div>
          </main>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl border border-amber-500/30 space-y-4 relative" style={{ backgroundColor: 'var(--card-bg)' }}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-sm font-bold">✕</button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-56 object-cover rounded-2xl" />
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-semibold">{selectedProduct.tag}</span>
            <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
            <p className="text-sm opacity-70">{selectedProduct.description}</p>
            <p className="text-xs text-amber-600 font-medium">ผู้ขาย: {selectedProduct.seller}</p>
            <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-stone-800">
              <span className="text-2xl font-black text-amber-600">{selectedProduct.price} ฿</span>
              <button
                onClick={(e) => {
                  handleAddToCart(selectedProduct, e);
                  setSelectedProduct(null);
                }}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-amber-700 transition"
              >
                เพิ่มเข้าตะกร้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Dock Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-3 rounded-full bg-stone-900/90 dark:bg-stone-950/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex items-center gap-2 sm:gap-4">
        {[
          { id: 'home', label: 'หน้าหลัก', icon: '🏠' },
          { id: 'cart', label: `ตะกร้า (${cart.length})`, icon: '🛒' },
          { id: 'profile', label: 'บัญชี', icon: '👤' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg scale-105'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}