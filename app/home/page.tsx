'use client';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

const mockProducts: Product[] = [
  { 
    id: 1, 
    name: 'หนังสือเรียน Programming 101 สภาพดี 99%', 
    price: 150, 
    originalPrice: 350, 
    discount: '-57%', 
    rating: 4.9, 
    reviews: 42, 
    badge: 'หนังสือ',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    name: 'เสื้อช็อป ไซส์ L มือสอง สภาพนางฟ้า', 
    price: 250, 
    originalPrice: 450, 
    discount: '-44%', 
    rating: 5.0, 
    reviews: 18, 
    badge: 'เครื่องแต่งกาย',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    name: 'หูฟัง Bluetooth เสียงดี เบสแน่น ตัดเสียงรบกวน', 
    price: 390, 
    originalPrice: 890, 
    discount: '-56%', 
    rating: 4.8, 
    reviews: 95, 
    badge: 'IT & GADGET',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' 
  },
  { 
    id: 4, 
    name: 'กระเป๋าเป้ นักศึกษา ช่องเยอะ กันน้ำ', 
    price: 200, 
    originalPrice: 490, 
    discount: '-59%', 
    rating: 4.9, 
    reviews: 31, 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' 
  },
];

export default function HomeRoutePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header สินค้าในวิทยาลัย */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-3 h-6 bg-orange-500 rounded-full inline-block"></span>
          สินค้าในวิทยาลัย
        </h1>
        <button 
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition shadow-md cursor-pointer"
        >
          + เพิ่มสินค้า
        </button>
      </div>

      {/* Grid การ์ดสินค้าพร้อมรูปภาพจริง */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {mockProducts.map((item) => (
          <div 
            key={item.id}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col justify-between cursor-pointer"
          >
            {/* รูปภาพสินค้า */}
            <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                {item.discount}
              </div>
              {item.badge && (
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                  {item.badge}
                </div>
              )}
            </div>

            {/* รายละเอียดสินค้า */}
            <div className="p-3 flex flex-col justify-between flex-1">
              <h2 className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {item.name}
              </h2>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-black text-orange-600 dark:text-orange-500">
                    ฿{item.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 line-through">
                    ฿{item.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    ขายแล้ว {item.reviews} ชิ้น
                  </span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}