'use client';

import Link from 'next/link';
import { Camera, Image as ImageIcon, ArrowRight, Sparkles, Lock, Zap, ShieldCheck } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between font-sans">
      
      {/* NAVBAR */}
      <header className="container mx-auto flex justify-between items-center py-5 px-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3 font-extrabold text-xl tracking-tight">
          <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20">
            <Camera className="w-5 h-5" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">
            Photo Pay
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/gallery"
            className="text-xs font-semibold text-slate-300 hover:text-emerald-400 transition hidden sm:block"
          >
            Client Gallery
          </Link>
          <Link
            href="/admin/gallery"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            Studio Admin Panel
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="container mx-auto my-auto py-10 px-6 text-center space-y-6 max-w-5xl">
        
        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" /> Premium Client Photo Proofing Portal
        </div>

        {/* 2-LINE HEADING */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
          <div>Professional Photo Delivery</div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            & Proofing Portal
          </div>
        </h1>

        {/* SUBTITLE */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ਕਲਾਇੰਟਸ ਲਈ HD ਫੋਟੋ ਗੈਲਰੀ, ਵਾਟਰਮਾਰਕ ਪ੍ਰੀਵਿਊ ਅਤੇ ਆਸਾਨ UPI ਪੇਮੈਂਟ ਸਿਸਟਮ। ਆਪਣੀਆਂ ਫੋਟੋਆਂ ਦੇਖਣ ਅਤੇ ਡਾਊਨਲੋਡ ਕਰਨ ਲਈ ਗੈਲਰੀ ਖੋਲ੍ਹੋ।
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/gallery"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            <ImageIcon className="w-5 h-5" />
            Open Client Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admin/gallery"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition active:scale-95"
          >
            Upload New Shoot (Admin)
          </Link>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Watermark Security</h3>
            <p className="text-xs text-slate-400 leading-normal">
              ਪੇਮੈਂਟ ਤੋਂ ਪਹਿਲਾਂ ਫੋਟੋਆਂ 'ਤੇ ਆਟੋਮੈਟਿਕ ਵਾਟਰਮਾਰਕ ਪ੍ਰੀਵਿਊ।
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Instant UPI Unlock</h3>
            <p className="text-xs text-slate-400 leading-normal">
              QR ਸਕੈਨ ਕਰਕੇ ਪੇਮੈਂਟ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਵਾਟਰਮਾਰਕ ਹਟਾਓ।
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Original HD Quality</h3>
            <p className="text-xs text-slate-400 leading-normal">
              ਅਨਲੌਕ ਹੋਣ ਤੋਂ ਬਾਅਦ ਓਰੀਜਨਲ ਹਾਈ-ਰੈਜ਼ੋਲਿਊਸ਼ਨ ਫੋਟੋਆਂ ਡਾਊਨਲੋਡ ਕਰੋ।
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="container mx-auto border-t border-slate-800/60 py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© 2026 Photo Pay. All Rights Reserved.</span>
        <span className="opacity-40 font-semibold tracking-wider text-slate-300">
          Designed & Developed by Sohal Developer
        </span>
      </footer>
    </div>
  );
}