// src/app/ver/[id]/[capitulo]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, MessageSquare, Sliders } from 'lucide-react';

export default function LectorPage() {
  // useParams nos permite leer directamente qué manhwa y qué capítulo está escrito en la URL
  const params = useParams();
  const idManga = params?.id as string;
  const idCapitulo = params?.capitulo as string;

  // Formateamos los textos para que se vean bonitos (ej: "solo-leveling" pasa a "SOLO LEVELING")
  const nombreFormateado = idManga?.replace(/-/g, ' ').toUpperCase();
  const capituloFormateado = idCapitulo?.replace(/-/g, ' ').toUpperCase();

  // Lista simulada de imágenes de páginas para leer de forma vertical (Scroll infinito)
  const paginasCapitulo = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', // Página 1 (Simulada)
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80', // Página 2 (Simulada)
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80', // Página 3 (Simulada)
  ];

  return (
    <main className="min-h-screen bg-[#070A12] text-gray-200 flex flex-col items-center">
      
      {/* 1. BARRA DE CONTROL SUPERIOR (Fija mientras lees) */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-800/80 px-4 md:px-6 flex items-center justify-between z-50">
        
        {/* Botón de retroceso al catálogo */}
        <div className="flex items-center gap-3">
          <a href="/manhwas" className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </a>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black text-white truncate max-w-[180px] md:max-w-xs leading-none">
              {nombreFormateado || 'MANHWA DETALLE'}
            </h1>
            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
              {capituloFormateado || 'CAPÍTULO'}
            </span>
          </div>
        </div>

        {/* SELECTORES DE NAVEGACIÓN (Capítulo Anterior / Siguiente) */}
        <div className="flex items-center gap-2 bg-[#111827] border border-gray-800 px-2 py-1.5 rounded-xl">
          <button className="p-1 hover:text-white text-gray-500 transition-colors cursor-pointer" title="Capítulo Anterior">
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-xs font-black text-gray-300 px-3 border-x border-gray-800 select-none">
            {capituloFormateado || 'CAP. 01'}
          </span>

          <button className="p-1 hover:text-white text-gray-400 transition-colors cursor-pointer" title="Capítulo Siguiente">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* HERRAMIENTAS EXTRAS (Ajustes y Comentarios) */}
        <div className="flex items-center gap-2 text-gray-400">
          <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Configurar lectura">
            <Sliders size={18} />
          </button>
          <button className="p-2 hover:text-white transition-colors cursor-pointer flex items-center gap-1" title="Cargar Comentarios">
            <MessageSquare size={18} />
            <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-full border border-red-500/20">
              12
            </span>
          </button>
        </div>
      </nav>

      {/* 2. CONTENEDOR DE IMÁGENES DEL MANHWA (Lectura en Cascada) */}
      <div className="pt-20 w-full max-w-[720px] flex flex-col bg-[#090D16] border-x border-gray-900 shadow-2xl">
        {paginasCapitulo.map((urlPagina, index) => (
          <div key={index} className="relative w-full aspect-[2/3] bg-gray-950/20 border-b border-gray-900/10">
            <img
              src={urlPagina}
              alt={`Página ${index + 1}`}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Pequeño indicador de página discreto en la esquina inferior */}
            <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-gray-400 border border-gray-800/50">
              {index + 1} / {paginasCapitulo.length}
            </span>
          </div>
        ))}
      </div>

      {/* 3. NAVEGACIÓN FINAL DE CAPÍTULO */}
      <div className="w-full max-w-[720px] bg-[#0B0F19] border-t border-gray-800/60 p-8 flex flex-col items-center gap-4 text-center border-x border-gray-900">
        <h4 className="text-sm font-bold text-gray-400">¡Has terminado de leer este capítulo!</h4>
        <button className="px-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-red-500/10 cursor-pointer">
          Siguiente Capítulo →
        </button>
      </div>
    </main>
  );
}