// src/components/HeroSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlide } from '@/types';

// Componente Interno: Icono de Espada Minimalista en SVG
const SwordIcon = ({ active }: { active: boolean }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`w-6 h-6 transition-all duration-300 ${
      active 
        ? 'text-white scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
        : 'text-gray-600 hover:text-gray-400'
    }`}
    fill="currentColor"
  >
    <path d="M19.78 4.22a3 3 0 0 0-4.24 0L11 8.76L8.76 6.5a1 1 0 0 0-1.41 0L3.5 10.35a1 1 0 0 0 0 1.41l2.26 2.26L4.31 15.5a1 1 0 0 0 0 1.41l1.41 1.41a1 1 0 0 0 1.41 0l1.48-1.48l2.26 2.26a1 1 0 0 0 1.41 0l3.85-3.85a1 1 0 0 0 0-1.41l-2.26-2.26l4.54-4.54a3 3 0 0 0 0-4.24ZM15.5 12.5l-3-3l5.5-5.5a1 1 0 0 1 1.41 1.41l-5.5 5.5l1.59 1.59Z"/>
  </svg>
);

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Lista de diapositivas que cumple con la regla de tener al menos 3 imágenes
  const slides: HeroSlide[] = [
    {
      id: '1',
      title: 'Solo Leveling: Ragnarok',
      description: 'La esperada secuela de la mayor leyenda de los manhwas. El viaje de Sung Suho comienza ahora.',
      coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
      accentColor: 'from-blue-600/30'
    },
    {
      id: '2',
      title: 'The Beginning After The End',
      description: 'El Rey Grey ha renacido en un mundo lleno de magia y monstruos. Deberá corregir los errores de su pasado.',
      coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80',
      accentColor: 'from-purple-600/30'
    },
    {
      id: '3',
      title: 'Omniscient Reader Viewpoint',
      description: 'El mundo real se convirtió repentinamente en la novela que solo él había terminado de leer.',
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80',
      accentColor: 'from-emerald-600/30'
    }
  ];

  // Efecto para el cambio automático de diapositiva (Autoplay de 8 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mb-16">
      {/* Mapeo de Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 flex items-end ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(to top, #0B0F19 15%, transparent 90%), linear-gradient(to right, #0B0F19 40%, transparent 85%), url(${slide.coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Sombra de color de acento estilizada */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accentColor} to-transparent opacity-40 mix-blend-multiply`} />

          {/* Textos Informativos */}
          <div className="relative z-20 p-6 md:p-12 max-w-xl flex flex-col items-start gap-3 select-none">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              DESTACADO DE HOY
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tight">
              {slide.title}
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed line-clamp-3">
              {slide.description}
            </p>
            <button className="mt-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-red-500/20 cursor-pointer">
              Empezar Lectura
            </button>
          </div>
        </div>
      ))}

      {/* Indicadores de Paginación Lateral (Espadas Interactivas) */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-4 bg-[#0B0F19]/60 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-gray-800/40">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentSlide(idx)}
            className="cursor-pointer focus:outline-none transition-transform active:scale-95"
            title={`Ver diapositiva ${idx + 1}`}
          >
            <SwordIcon active={idx === currentSlide} />
          </button>
        ))}
      </div>
    </div>
  );
}