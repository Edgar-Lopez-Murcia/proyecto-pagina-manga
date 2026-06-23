'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { crearSesion } from '@/lib/auth';
import { validarEmail } from '@/lib/validaciones';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Validaciones
      if (!email.trim()) {
        throw new Error('El email es requerido');
      }
      if (!validarEmail(email)) {
        throw new Error('Email inválido');
      }
      if (!contraseña.trim()) {
        throw new Error('La contraseña es requerida');
      }

      // Llamar a API route para validar
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Crear sesión
      crearSesion(data.usuario);

      // Redirigir
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">
          Inicia Sesión
        </h1>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
          Bienvenido de vuelta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#05070B] border border-gray-900 hover:border-gray-800 focus:border-red-600 px-4 py-3 rounded-xl text-xs font-bold text-white placeholder-gray-700 focus:outline-none transition-all tracking-widest"
          />
        </div>

        {/* CONTRASEÑA */}
        <div>
          <input
            type="password"
            placeholder="CONTRASEÑA"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full bg-[#05070B] border border-gray-900 hover:border-gray-800 focus:border-red-600 px-4 py-3 rounded-xl text-xs font-bold text-white placeholder-gray-700 focus:outline-none transition-all tracking-widest"
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400 font-bold">{error}</p>
          </div>
        )}

        {/* BOTÓN SUBMIT */}
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
        >
          {cargando ? 'VERIFICANDO...' : 'ENTRAR AL SISTEMA'}
        </button>
      </form>

      {/* LINKS */}
      <div className="space-y-3 text-center border-t border-gray-900/60 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/registro" className="text-red-500 hover:text-red-400 transition-colors">
            Regístrate aquí
          </Link>
        </p>
        <Link
          href="/auth/landing"
          className="inline-block text-xs font-bold text-gray-600 hover:text-gray-400 transition-colors"
        >
          ← Volver atrás
        </Link>
      </div>
    </div>
  );
}
