'use client';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        
        {/* ปุ่มปิด Modal */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-1"
        >
          ✕
        </button>

        {/* หัวข้อ Login */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">เข้าสู่ระบบ</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            เข้าใช้งานด้วยบัญชีนักศึกษาของคุณ
          </p>
        </div>

        {/* ฟอร์ม กรอกข้อมูล */}
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              อีเมลนักศึกษา / รหัสนักศึกษา
            </label>
            <input
              type="text"
              required
              placeholder="std12345@campus.ac.th"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-xl text-sm outline-none border border-transparent focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              รหัสผ่าน
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-xl text-sm outline-none border border-transparent focus:border-orange-500 transition"
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
              <input type="checkbox" className="accent-orange-500" /> จำฉันไว้
            </label>
            <a href="#" className="text-orange-500 font-bold hover:underline">ลืมรหัสผ่าน?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-orange-500/30 cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>
        </form>

      </div>
    </div>
  );
}