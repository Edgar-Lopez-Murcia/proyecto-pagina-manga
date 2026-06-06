// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simulada para pruebas
    if (email === 'inalik@sumi.com' && password === '123456') {
      // Guardamos la sesión en el localStorage
      localStorage.setItem('sumi_session', JSON.stringify({ name: 'ByInalik', email }));
      router.push('/perfil'); // Redirige al perfil de inmediato
    } else {
      setError('Credenciales incorrectas. Prueba con inalik@sumi.com y 123456');
    }
  };

  return (
    <main className="min-h-screen bg-[#05070B] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Efecto de luces de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Contenedor del Formulario */}
      <div className="w-full max-w-md bg-[#0F1422]/40 border border-gray-900/80 rounded-2xl p-8 backdrop-blur-md relative z-10">
        
        {/* Encabezado / Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black tracking-widest text-white uppercase group">
            SUMI<span className="text-red-500 group-hover:animate-pulse">.</span>
          </Link>
          <p className="text-xs text-gray-500 font-medium mt-2">
            Inicia sesión para guardar tus marcadores y favoritos
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2.5">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="ejemplo@sumi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#05070B]/60 border border-gray-900 focus:border-red-500/40 text-sm text-white rounded-xl px-4 py-3 placeholder-gray-700 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#05070B]/60 border border-gray-900 focus:border-red-500/40 text-sm text-white rounded-xl px-4 py-3 placeholder-gray-700 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white text-xs font-black uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/10 mt-6"
          >
            <LogIn size={14} />
            Ingresar a la plataforma
          </button>
        </form>

        {/* Nota informativa para pruebas */}
        <div className="mt-6 pt-5 border-t border-gray-900/60 text-center">
          <p className="text-[10px] text-gray-600 font-medium leading-relaxed">
            Modo desarrollo habilitado.<br />
            Usa las credenciales de prueba: <span className="text-gray-400">inalik@sumi.com</span> / <span className="text-gray-400">123456</span>
          </p>
        </div>

      </div>
    </main>
  );
}