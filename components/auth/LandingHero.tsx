'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Bookmark, Users } from 'lucide-react';

export default function LandingHero() {
  const caracteristicas = [
    {
      icono: <BookOpen size={28} />,
      titulo: 'Lee sin publicidad',
      descripcion: 'Disfruta de miles de mangas sin interrupciones',
    },
    {
      icono: <Heart size={28} />,
      titulo: 'Guardar favoritos',
      descripcion: 'Mantén un registro de tus series preferidas',
    },
    {
      icono: <Bookmark size={28} />,
      titulo: 'Continúa leyendo',
      descripcion: 'Retoma donde dejaste automáticamente',
    },
    {
      icono: <Users size={28} />,
      titulo: 'Comunidad activa',
      descripcion: 'Conecta con otros lectores y comparte opiniones',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 space-y-16">
      {/* SECCIÓN HERO */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          Tu plataforma de lectura
          <br />
          <span className="text-red-500">favorita</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 font-medium max-w-2xl mx-auto">
          Lee mangas, manhwas y manhuas en línea con una experiencia fluida y sin límites. 
          Guarda tus favoritos, continúa donde dejaste y únete a nuestra comunidad.
        </p>
      </div>

      {/* CARACTERÍSTICAS EN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {caracteristicas.map((cara, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#0F1422]/40 border border-gray-900/60 rounded-2xl hover:border-gray-800 transition-all duration-300 group"
          >
            <div className="text-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
              {cara.icono}
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-wide mb-2">
              {cara.titulo}
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              {cara.descripcion}
            </p>
          </div>
        ))}
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Link
          href="/auth/registro"
          className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 active:scale-95 text-center"
        >
          Crear Cuenta Gratis
        </Link>
        <Link
          href="/auth/login"
          className="px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 text-center"
        >
          Iniciar Sesión
        </Link>
      </div>

      {/* INFORMACIÓN ADICIONAL */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-900/60">
        <div className="text-center">
          <p className="text-2xl font-black text-red-500">10k+</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Mangas disponibles</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-red-500">50k+</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Lectores activos</p>
        </div>
        <div className="col-span-2 sm:col-span-1 text-center">
          <p className="text-2xl font-black text-red-500">24/7</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Disponible siempre</p>
        </div>
      </div>
    </div>
  );
}
