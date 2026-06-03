// src/components/HeroSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Datos simulados internos para las 3 imágenes destacadas del slider
const SLIDES_DESTACADOS = [
  {
    id: 'solo-leveling',
    titulo: 'Solo Leveling: Ragnarok',
    sinopsis: 'La tierra vuelve a estar bajo amenaza cuando los Dioses Exteriores intentan invadir el universo entero. Sung Suho, el hijo del monarca de las sombras Sung Jinwoo, despierta sus poderes ocultos.',
    imagenBanner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop', // Reemplaza por tus banners reales
    tipo: 'Manhwa'
  },
  {
    id: 'tower-of-god',
    titulo: 'Tower of God',
    sinopsis: '¿Qué deseas? ¿Dinero y riqueza? ¿Honor y orgullo? ¿Autoridad y poder? ¿O venganza? Todo lo que desees y más se encuentra en la cima de la Torre. Sigue la historia de Baam en su ascenso.',
    imagenBanner: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1920&auto=format&fit=crop',
    tipo: 'Manhwa'
  },
  {
    id: 'omniscient-reader',
    titulo: 'Omniscient Reader\'s Viewpoint',
    sinopsis: 'Dokja era un oficinista promedio cuyo único interés era leer su novela web favorita. Pero cuando la novela se vuelve una terrible realidad, él es el único que conoce el final del mundo.',
    imagenBanner: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1920&auto=format&fit=crop',
    tipo: 'Manhwa'
  }
];

export default function HeroSlider() {
  const [slideActual, setSlideActual] = useState<number>(0);
  const router = useRouter();

  // Temporizador para que cambie automáticamente cada 6 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % SLIDES_DESTACADOS.length);
    }, 6000);

    return () => clearInterval(intervalo);
  }, []);

  const slideSiguiente = () => {
    setSlideActual((prev) => (prev + 1) % SLIDES_DESTACADOS.length);
  };

  const slideAnterior = () => {
    setSlideActual((prev) => (prev - 1 + SLIDES_DESTACADOS.length) % SLIDES_DESTACADOS.length);
  };

  return (
    <div className="relative w-full h-[450px] md:h-[550px] bg-[#070A12] overflow-hidden group select-none">
      
      {/* CONTENEDOR DE SLIDES */}
      <div className="w-full h-full relative">
        {SLIDES_DESTACADOS.map((slide, indice) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              indice === slideActual ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Imagen de Fondo con gradiente oscuro integrado */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{ backgroundImage: `url(${slide.imagenBanner})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]" />

            {/* CONTENIDO TEXTUAL */}
            <div className="absolute inset-0 max-w-6xl mx-auto px-6 flex flex-col justify-center pt-16 z-20">
              <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md w-max mb-4">
                🔥 {slide.tipo} Destacado
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider max-w-2xl leading-tight dynamic-title">
                {slide.titulo}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-xl font-medium leading-relaxed line-clamp-3">
                {slide.sinopsis}
              </p>
              
              <button
                onClick={() => router.push(`/manhwas/${slide.id}`)}
                className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all w-max flex items-center gap-2 shadow-lg shadow-red-500/20 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3l14 9-14 9V3z"/>
                </svg>
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FLECHAS DE NAVEGACIÓN (SVG Limpios) */}
      <button
        onClick={slideAnterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-red-500 border border-gray-800/40 hover:border-red-400 rounded-xl text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        title="Anterior"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <button
        onClick={slideSiguiente}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/40 hover:bg-red-500 border border-gray-800/40 hover:border-red-400 rounded-xl text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        title="Siguiente"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      {/* PUNTOS INFERIORES DE CONTROL (INDICADORES) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES_DESTACADOS.map((_, indice) => (
          <button
            key={indice}
            onClick={() => setSlideActual(indice)}
            className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
              indice === slideActual ? 'w-6 bg-red-500' : 'w-2 bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

    </div>
  );
}