'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// SVG de Corona optimizado
const CoronaIcon = ({ color, size = 22, className }: { color: string, size?: number, className?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} width={size} height={size} className={className}>
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"/>
  </svg>
);

// Datos del Slider con las nuevas URLs proporcionadas
const SLIDES_DESTACADOS = [
  { 
    id: 'solo-leveling', 
    titulo: 'Solo Leveling: Ragnarok', 
    sinopsis: 'La tierra vuelve a estar bajo amenaza cuando los Dioses Exteriores intentan invadir el universo entero. Sung Suho, el hijo del monarca de las sombras Sung Jinwoo, despierta sus poderes ocultos.', 
    imagenBanner: 'https://images5.alphacoders.com/106/thumb-1920-1062691.jpg',
    tipo: 'Manhwa' 
  },
  { 
    id: 'tower-of-god', 
    titulo: 'Tower of God', 
    sinopsis: '¿Qué deseas? ¿Dinero y riqueza? ¿Honor y orgullo? ¿Autoridad y poder? ¿O venganza? Todo lo que desees y más se encuentra en la cima de la Torre.', 
    imagenBanner: 'https://images5.alphacoders.com/107/thumb-1920-1079419.png',
    tipo: 'Manhwa' 
  },
  { 
    id: 'omniscient-reader', 
    titulo: 'Omniscient Reader\'s Viewpoint', 
    sinopsis: 'Dokja era un oficinista promedio cuyo único interés era leer su novela web favorita. Pero cuando la novela se vuelve una terrible realidad, él es el único que conoce el final del mundo.', 
    imagenBanner: 'https://images8.alphacoders.com/136/thumb-1920-1362708.jpeg',
    tipo: 'Manhwa' 
  }
];

export default function HeroSlider() {
  const [slideActual, setSlideActual] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % SLIDES_DESTACADOS.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="relative w-full h-[550px] bg-[#070A12] overflow-hidden group">
      {SLIDES_DESTACADOS.map((slide, indice) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${indice === slideActual ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          {/* Imagen con ajuste horizontal */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat" 
            style={{ 
              backgroundImage: `url(${slide.imagenBanner})`,
              backgroundPosition: '50% 30%'
            }} 
          />
          
          {/* Degradados profesionales */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent" />
          
          <div className="absolute inset-0 max-w-6xl mx-auto px-6 flex flex-col justify-center z-20">
            {/* Etiqueta profesional */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-sm rounded w-max mb-4">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-red-600">
                <path d="M12 2c-3.3 0-6 2.7-6 6 0 2.5 1.5 4.8 3.8 5.7L8 16h8l-1.8-2.3c2.3-.9 3.8-3.2 3.8-5.7 0-3.3-2.7-6-6-6z"/>
              </svg>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                {slide.tipo} Destacado
              </span>
            </div>

            <h2 className="text-5xl font-black text-white uppercase tracking-tight leading-none">{slide.titulo}</h2>
            <p className="text-sm text-gray-300 mt-4 max-w-lg font-medium leading-relaxed line-clamp-3">{slide.sinopsis}</p>
            
            <button 
              onClick={() => router.push(`/manhwas/${slide.id}`)} 
              className="mt-8 px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded hover:bg-gray-200 transition-all w-max"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      ))}

      {/* Indicadores de Coronas (SVG) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-30">
        {SLIDES_DESTACADOS.map((_, indice) => {
          const isGold = indice === 1;
          const isBronze = indice === 0;
          return (
            <button key={indice} onClick={() => setSlideActual(indice)} className="transition-all hover:scale-110 flex items-center justify-center">
              <CoronaIcon 
                size={isGold ? 26 : 22} 
                color={isGold ? "#FFD700" : isBronze ? "#CD7F32" : "#C0C0C0"} 
                className={isGold ? "drop-shadow-[0_0_8px_#FFD700] animate-pulse" : ""}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}