// src/app/registro/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#020306] flex items-center justify-center p-6 selection:bg-red-600">
      <div className="w-full max-w-[340px] space-y-8">
        <div className="space-y-1">
          <h1 className="text-white text-xl font-black tracking-tighter uppercase">REGISTRO</h1>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">CREA TU CUENTA EN INALIK</p>
        </div>
        
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="NOMBRE DE USUARIO" className="w-full bg-[#05070B] border border-gray-900 px-4 py-4 rounded-xl text-[10px] font-bold text-white placeholder-gray-800 focus:outline-none focus:border-red-600 transition-all uppercase tracking-widest" />
          <input type="email" placeholder="CORREO ELECTRÓNICO" className="w-full bg-[#05070B] border border-gray-900 px-4 py-4 rounded-xl text-[10px] font-bold text-white placeholder-gray-800 focus:outline-none focus:border-red-600 transition-all uppercase tracking-widest" />
          <input type="password" placeholder="CONTRASEÑA" className="w-full bg-[#05070B] border border-gray-900 px-4 py-4 rounded-xl text-[10px] font-bold text-white placeholder-gray-800 focus:outline-none focus:border-red-600 transition-all uppercase tracking-widest" />
          <button className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(220,38,38,0.3)] active:scale-[0.99]">CREAR CUENTA</button>
        </form>

        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-800">
            ¿YA TIENES CUENTA? <Link href="/login" className="text-red-600 hover:text-white transition-colors">INICIA SESIÓN</Link>
          </p>
        </div>
      </div>
    </main>
  );
}