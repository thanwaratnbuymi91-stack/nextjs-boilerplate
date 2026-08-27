'use client';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-sky-500/30 relative text-slate-100">
        
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg p-1"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-white">เข้าสู่ระบบ</h2>
          <p className="text-xs text-slate-400 mt-1">
            เข้าใช้งานด้วยบัญชีนักศึกษาของคุณ
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              อีเมลนักศึกษา / รหัสนักศึกษา
            </label>
            <input
              type="text"
              required
              placeholder="std12345@campus.ac.th"
              className="w-full bg-slate-950 text-slate-100 px-4 py-3 rounded-xl text-sm outline-none border border-slate-800 focus:border-sky-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              รหัสผ่าน
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-slate-950 text-slate-100 px-4 py-3 rounded-xl text-sm outline-none border border-slate-800 focus:border-sky-500 transition"
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
              <input type="checkbox" className="accent-sky-500" /> จำฉันไว้
            </label>
            <a href="#" className="text-sky-400 font-bold hover:underline">ลืมรหัสผ่าน?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-sky-500/30 cursor-pointer"
          >
            เข้าสู่ระบบ
          </button>
        </form>

      </div>
    </div>
  );
}