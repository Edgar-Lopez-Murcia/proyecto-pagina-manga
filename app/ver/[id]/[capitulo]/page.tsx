// src/app/ver/[id]/[capitulo]/page.tsx
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Sliders, MessageSquare } from 'lucide-react';

export default function LectorPage() {
  const params = useParams();
  const router = useRouter();
  const idManga = params?.id as string;
  const idCapitulo = params?.capitulo as string;

  const nombreFormateado = idManga?.replace(/-/g, ' ').toUpperCase();
  const capituloFormateado = idCapitulo?.replace(/-/g, ' ').toUpperCase();

  // Imágenes simuladas en cascada continua
  const paginasCapitulo = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
  ];

  // 🆕 LÓGICA DE INTERACTIVIDAD PARA NAVEGAR ENTRE CAPÍTULOS
  // Extraemos el número de la URL (ej: de "capitulo-29" extrae el número 29)
  const numeroCapituloActual = parseInt(idCapitulo?.split('-')[1]) || 1;

  const cambiarCapitulo = (direccion: 'sig' | 'ant') => {
    let nuevoNumero = numeroCapituloActual;

    if (direccion === 'sig') {
      nuevoNumero = numeroCapituloActual + 1;
    } else if (direccion === 'ant') {
      // Evitamos que baje del capítulo 1
      if (numeroCapituloActual <= 1) return;
      nuevoNumero = numeroCapituloActual - 1;
    }

    // Guardamos la marca de leído en el LocalStorage para el nuevo capítulo antes de viajar
    const guardados = localStorage.getItem(`leidos-${idManga}`);
    let marcas = guardados ? JSON.parse(guardados) : [];
    if (!marcas.includes(nuevoNumero.toString())) {
      marcas.push(nuevoNumero.toString());
      localStorage.setItem(`leidos-${idManga}`, JSON.stringify(marcas));
    }

    // Redireccionamos a la nueva ruta dinámica
    router.push(`/ver/${idManga}/capitulo-${nuevoNumero}`);
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-gray-200 flex flex-col items-center pb-24">
      
      {/* 1. NAV SUPERIOR */}
      <nav className="fixed top-0 left-0 w-full h-14 md:h-16 bg-[#0B0F19]/95 backdrop-blur-md border-b border-b-gray-800/60 px-3 md:px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 md:gap-3 max-w-[70%]">
          <button 
            onClick={() => router.push(`/manhwas/${idManga}`)} // Regresa directo al perfil del manhwa
            className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="truncate">
            <h1 className="text-xs md:text-sm font-black text-white truncate max-w-[150px] sm:max-w-xs leading-tight">
              {nombreFormateado || 'MANHWA'}
            </h1>
            <span className="text-[10px] md:text-[11px] text-red-400 font-bold uppercase tracking-wider block">
              {capituloFormateado || 'CAPÍTULO'}
            </span>
          </div>
        </div>

        {/* SELECTORES DE NAVEGACIÓN PARA COMPUTADORA (PC) */}
        <div className="hidden sm:flex items-center gap-2 bg-[#111827] border border-gray-800 px-2 py-1.5 rounded-xl">
          <button 
            onClick={() => cambiarCapitulo('ant')}
            disabled={numeroCapituloActual <= 1}
            className="p-1 hover:text-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer" 
            title="Capítulo Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-black text-gray-300 px-3 border-x border-gray-800 select-none">
            {capituloFormateado || 'CAP. 01'}
          </span>
          <button 
            onClick={() => cambiarCapitulo('sig')}
            className="p-1 hover:text-white text-gray-400 transition-colors cursor-pointer" 
            title="Capítulo Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Herramientas extras */}
        <div className="flex items-center gap-1 md:gap-2 text-gray-400">
          <button className="p-2 hover:text-white transition-colors cursor-pointer">
            <Sliders size={18} />
          </button>
          <button className="p-2 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
            <MessageSquare size={18} />
            <span className="text-[9px] md:text-[10px] font-bold bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-full border border-red-500/20">
              12
            </span>
          </button>
        </div>
      </nav>

      {/* 2. CONTENEDOR DE IMÁGENES */}
      <div className="pt-14 md:pt-20 w-full max-w-[720px] flex flex-col bg-[#090D16] md:border-x md:border-gray-900 shadow-2xl">
        {paginasCapitulo.map((urlPagina, index) => (
          <div key={index} className="relative w-full aspect-[2/3] bg-gray-950/10">
            <img
              src={urlPagina}
              alt={`Página ${index + 1}`}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-gray-400 border border-gray-800/40">
              {index + 1} / {paginasCapitulo.length}
            </span>
          </div>
        ))}
      </div>

      {/* BOTÓN GRANDE AL FINAL DE LAS IMÁGENES */}
      <div className="w-full max-w-[720px] bg-[#0B0F19] p-6 md:p-8 flex flex-col items-center gap-4 text-center md:border-x md:border-gray-900">
        <h4 className="text-xs md:text-sm font-bold text-gray-400">¡Has terminado de leer este capítulo!</h4>
        <button 
          onClick={() => cambiarCapitulo('sig')}
          className="w-full sm:w-auto px-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-red-500/10 cursor-pointer"
        >
          Siguiente Capítulo →
        </button>
      </div>

      {/* 3. CONTROL DE NAVEGACIÓN INFERIOR PARA MÓVILES */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[#0B0F19]/95 backdrop-blur-md border-t border-gray-800/50 flex items-center justify-center px-4 z-50">
        <div className="w-full max-w-md flex items-center justify-between bg-[#111827] border border-gray-800/80 px-2 py-1 rounded-xl shadow-xl">
          
          {/* Botón Anterior Táctil */}
          <button 
            onClick={() => cambiarCapitulo('ant')}
            disabled={numeroCapituloActual <= 1}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} /> <span>Ant</span>
          </button>
          
          {/* Indicador */}
          <span className="text-xs font-black text-gray-200 select-none uppercase tracking-wide">
            {capituloFormateado || 'CAPÍTULO'}
          </span>

          {/* Botón Siguiente Táctil */}
          <button 
            onClick={() => cambiarCapitulo('sig')}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <span>Sig</span> <ChevronRight size={16} />
          </button>
          
        </div>
      </div>

    </main>
  );
}