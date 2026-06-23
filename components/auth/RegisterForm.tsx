'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { crearSesion } from '@/lib/auth';
import { validarEmail, validarContraseña } from '@/lib/validaciones';

export default function RegisterForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [fortaleza, setFortaleza] = useState<'debil' | 'media' | 'fuerte'>('debil');

  const calcularFortaleza = (pwd: string) => {
    if (pwd.length >= 8 && /\d/.test(pwd) && /[A-Z]/.test(pwd)) {
      setFortaleza('fuerte');
    } else if (pwd.length >= 6 && /\d/.test(pwd)) {
      setFortaleza('media');
    } else {
      setFortaleza('debil');
    }
  };

  const handleChangeContraseña = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContraseña(value);
    calcularFortaleza(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Validaciones
      if (!nombre.trim() || nombre.length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
      }
      if (!email.trim() || !validarEmail(email)) {
        throw new Error('Email inválido');
      }
      if (!validarContraseña(contraseña).valida) {
        const msg = validarContraseña(contraseña).errores[0];
        throw new Error(msg);
      }
      if (contraseña !== confirmar) {
        throw new Error('Las contraseñas no coinciden');
      }
      if (!terminos) {
        throw new Error('Debes aceptar los términos y condiciones');
      }

      // Llamar a API route para crear usuario
      const response = await fetch('/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, contraseña }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrarse');
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
          Crear Cuenta
        </h1>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
          Únete a nuestra comunidad
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NOMBRE */}
        <div>
          <input
            type="text"
            placeholder="NOMBRE DE USUARIO"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-[#05070B] border border-gray-900 hover:border-gray-800 focus:border-red-600 px-4 py-3 rounded-xl text-xs font-bold text-white placeholder-gray-700 focus:outline-none transition-all tracking-widest"
          />
        </div>

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
            onChange={handleChangeContraseña}
            className="w-full bg-[#05070B] border border-gray-900 hover:border-gray-800 focus:border-red-600 px-4 py-3 rounded-xl text-xs font-bold text-white placeholder-gray-700 focus:outline-none transition-all tracking-widest"
          />
          {/* INDICADOR DE FORTALEZA */}
          <div className="mt-2 h-1 bg-gray-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                fortaleza === 'debil'
                  ? 'w-1/3 bg-red-500'
                  : fortaleza === 'media'
                    ? 'w-2/3 bg-yellow-500'
                    : 'w-full bg-green-500'
              }`}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            {fortaleza === 'debil' && 'Contraseña débil'}
            {fortaleza === 'media' && 'Contraseña media'}
            {fortaleza === 'fuerte' && 'Contraseña fuerte'}
          </p>
        </div>

        {/* CONFIRMAR CONTRASEÑA */}
        <div>
          <input
            type="password"
            placeholder="CONFIRMAR CONTRASEÑA"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className="w-full bg-[#05070B] border border-gray-900 hover:border-gray-800 focus:border-red-600 px-4 py-3 rounded-xl text-xs font-bold text-white placeholder-gray-700 focus:outline-none transition-all tracking-widest"
          />
        </div>

        {/* TÉRMINOS Y CONDICIONES */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terminos"
            checked={terminos}
            onChange={(e) => setTerminos(e.target.checked)}
            className="mt-1 cursor-pointer accent-red-600"
          />
          <label htmlFor="terminos" className="text-xs text-gray-400 font-medium leading-relaxed">
            Acepto los{' '}
            <Link href="#" className="text-red-500 hover:text-red-400">
              términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link href="#" className="text-red-500 hover:text-red-400">
              política de privacidad
            </Link>
          </label>
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
          disabled={cargando || !terminos}
          className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
        >
          {cargando ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
        </button>
      </form>

      {/* LINKS */}
      <div className="space-y-3 text-center border-t border-gray-900/60 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="text-red-500 hover:text-red-400 transition-colors">
            Inicia sesión
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
