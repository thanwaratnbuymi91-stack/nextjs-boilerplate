'use client';

import { useState } from 'react';
import { useStore } from '../layout';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  rating: number;
  category: string;
  cover: string;
  synopsis: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Minimalist Thinking',
    author: 'Elena Rostova',
    price: 390,
    rating: 4.9,
    category: 'ปรัชญา & จิตวิทยา',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    synopsis: 'ศิลปะแห่งการจัดระเบียบความคิด ตัดสิ่งที่ไม่จำเป็นออก เพื่อสร้างสรรค์ผลงานระดับมาสเตอร์พีซ',
  },
  {
    id: 2,
    title: 'Architectural Form & Space',
    author: 'Kenji Takahashi',
    price: 520,
    rating: 4.8,
    category: 'ดีไซน์ & สถาปัตย์',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    synopsis: 'สำรวจรูปทรงและมิติของพื้นที่สถาปัตยกรรมมินิมอลยุคใหม่ จากแนวคิดญี่ปุ่นสู่สากล',
  },
  {
    id: 3,
    title: 'The Silent Code',
    author: 'Marcus Vance',
    price: 450,
    rating: 5.0,
    category: 'เทคโนโลยี',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    synopsis: 'เบื้องหลังการออกแบบสถาปัตยกรรมซอฟต์แวร์ที่เรียบง่าย แต่ทรงพลังและรองรับผู้ใช้งานหลักล้าน',
  },
  {
    id: 4,
    title: 'Color & Typography',
    author: 'Sarah Jenkins',
    price: 380,
    rating: 4.7,
    category: 'ดีไซน์ & สถาปัตย์',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    synopsis: 'คู่มือการเลือกใช้โทนสีมินิมอลและการจัดวางตัวอักษรเพื่อสร้างประสบการณ์ Visual สบายตา',
  },
];

const CATEGORIES = ['ทั้งหมด', 'ปรัชญา & จิตวิทยา', 'ดีไซน์ & สถาปัตย์', 'เทคโนโลยี'];

export default function BookStorePage() {
  const { theme, toggleTheme } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'fav' | 'cart'>('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  // ฟังก์ชันจัดการ Cart
  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  // การกรองข้อมูลหนังสือ
  const filteredBooks = BOOKS.filter((book) => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'fav' ? favorites.includes(book.id) : true;
    return matchesCategory && matchesSearch && matchesTab;
  });

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-12 py-8 pb-32 max-w-7xl mx-auto selection:bg-stone-200 dark:selection:bg-zinc-800">
      
      {/* 🔮 Header Section */}
      <header className="flex justify-between items-center py-6 border-b border-stone-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-black text-xl shadow-lg hover:rotate-12 transition-transform">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-zinc-100">LIBRA 3D</h1>
            <p className="text-[10px] text-stone-400 dark:text-zinc-500 tracking-widest uppercase">Minimalist Bookstore</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-stone-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-stone-200/60 dark:border-zinc-800 w-64 focus-within:w-80 transition-all">
          <span className="text-xs text-stone-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="ค้นหาหนังสือ หรือชื่อผู้แต่ง..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-stone-800 dark:text-zinc-200 placeholder-stone-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:scale-105 active:scale-95 transition-all shadow-sm text-sm"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-sm">🛒</span>
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 🏷️ Filter Categories */}
      <section className="my-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md scale-105'
                : 'bg-stone-100 dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 hover:bg-stone-200 dark:hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* 📚 3D Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20 text-stone-400 dark:text-zinc-500 text-sm">
          ไม่พบหนังสือที่ค้นหา
        </div>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFav={favorites.includes(book.id)}
              onToggleFav={(e) => toggleFavorite(book.id, e)}
              onAddToCart={() => handleAddToCart(book)}
              onPreview={() => setPreviewBook(book)}
            />
          ))}
        </main>
      )}

      {/* 🧊 3D Flip Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative flex flex-col sm:flex-row gap-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewBook(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 dark:hover:text-zinc-100 text-sm p-2"
            >
              ✕
            </button>
            <div className="w-full sm:w-1/2 h-64 rounded-2xl overflow-hidden shadow-lg border border-stone-100 dark:border-zinc-800">
              <img src={previewBook.cover} alt={previewBook.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-zinc-500">
                  {previewBook.category}
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-zinc-100 mt-1">{previewBook.title}</h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400 mb-3">โดย {previewBook.author}</p>
                <p className="text-xs text-stone-600 dark:text-zinc-300 leading-relaxed line-clamp-4">
                  {previewBook.synopsis}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xl font-black text-stone-900 dark:text-zinc-100">{previewBook.price} ฿</span>
                <button
                  onClick={() => {
                    handleAddToCart(previewBook);
                    setPreviewBook(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  + ใส่ตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🛍️ Side Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-200 dark:border-zinc-800">
                <h2 className="font-bold text-lg text-stone-900 dark:text-zinc-100">ตะกร้าสินค้า ({totalCartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-900">
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-center py-10 text-xs text-stone-400">ยังไม่มีสินค้าในตะกร้า</p>
                ) : (
                  cartItems.map(({ book, quantity }) => (
                    <div key={book.id} className="flex gap-4 items-center justify-between border-b border-stone-100 dark:border-zinc-800/50 pb-3">
                      <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-zinc-100 line-clamp-1">{book.title}</h4>
                        <p className="text-[11px] text-stone-500">{book.price} ฿</p>
                      </div>
                      <div className="flex items-center gap-2 bg-stone-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                        <button onClick={() => updateQuantity(book.id, -1)} className="text-xs px-1 text-stone-500 hover:text-stone-900 font-bold">-</button>
                        <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(book.id, 1)} className="text-xs px-1 text-stone-500 hover:text-stone-900 font-bold">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-stone-500">ราคารวมทั้งหมด</span>
                <span className="text-xl font-black text-stone-900 dark:text-zinc-100">{totalPrice} ฿</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => alert('ดำเนินการสั่งซื้อเรียบร้อย!')}
                className="w-full py-3 rounded-full bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧭 Minimal 3D Floating Navbar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-stone-200 dark:border-zinc-800 shadow-xl flex items-center gap-6">
        {[
          { id: 'home', label: 'หน้าแรก', icon: '📖' },
          { id: 'fav', label: `ชื่นชอบ (${favorites.length})`, icon: '❤️' },
          { id: 'cart', label: 'ตะกร้า', icon: '🛍️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'cart') {
                setIsCartOpen(true);
              } else {
                setActiveTab(tab.id as 'home' | 'fav');
              }
            }}
            className={`flex items-center gap-2 text-xs font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${
              activeTab === tab.id
                ? 'bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm'
                : 'text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100'
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

// 🧊 Component: 3D Tilt Book Card
function BookCard({
  book,
  isFav,
  onToggleFav,
  onAddToCart,
  onPreview,
}: {
  book: Book;
  isFav: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
  onAddToCart: () => void;
  onPreview: () => void;
}) {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onPreview}
      style={{
        transform,
        transition: 'transform 0.15s ease-out',
      }}
      className="group bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-stone-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      <button
        onClick={onToggleFav}
        className="absolute top-7 right-7 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md flex items-center justify-center text-xs shadow-sm border border-stone-100 dark:border-zinc-700 hover:scale-110 active:scale-95 transition-all"
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <div className="relative h-60 w-full mb-4 rounded-2xl overflow-hidden bg-stone-100 dark:bg-zinc-800 flex items-center justify-center border border-stone-100 dark:border-zinc-800">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-zinc-500 mb-1">
          <span>{book.category}</span>
          <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-zinc-300">★ {book.rating}</span>
        </div>
        <h3 className="font-bold text-base text-stone-900 dark:text-zinc-100 group-hover:text-stone-600 dark:group-hover:text-zinc-400 transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5 mb-4">โดย {book.author}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-zinc-800">
        <span className="text-base font-extrabold text-stone-900 dark:text-zinc-100">{book.price} ฿</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="px-4 py-2 rounded-full bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-sm"
        >
          + เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}