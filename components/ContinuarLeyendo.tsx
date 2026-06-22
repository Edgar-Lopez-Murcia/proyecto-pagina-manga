// src/components/ContinuarLeyendo.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Play } from 'lucide-react';

interface ProgresoManga {
  id: string;
  titulo: string;
  imagen: string;
  capituloGuardado: string;
}

export default function ContinuarLeyendo() {
  const [progresos, setProgresos] = useState<ProgresoManga[]>([]);

  useEffect(() => {
    const historialRaw = localStorage.getItem('sumi_progreso');
    if (!historialRaw) return;

    try {
      const historial = JSON.parse(historialRaw);
      const listaProgresos: ProgresoManga[] = [];

      Object.keys(historial).forEach((idManga) => {
        const mangaFound = BASE_DATOS_MANGAS.find((m) => m.id === idManga) as any;
        
        if (mangaFound) {
          listaProgresos.push({
            id: idManga,
            titulo: mangaFound.titulo || mangaFound.title || 'Sin título',
            imagen: mangaFound.imagen || mangaFound.cover || mangaFound.img || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80',
            capituloGuardado: historial[idManga],
          });
        }
      });

      setProgresos(listaProgresos);
    } catch (error) {
      console.error('Error al parsear el progreso de lectura:', error);
    }
  }, []);

  if (progresos.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-10 animate-in fade-in duration-500">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1 h-3 bg-red-500 rounded-full" />
        Continuar Leyendo
      </h3>

      {/* Grid optimizado: agregamos más columnas por fila para achicar las carátulas */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {progresos.map((item) => (
          <Link
            key={item.id}
            href={`/manhwuas/${item.id}/${item.capituloGuardado}`}
            className="group relative bg-[#0F1422]/30 border border-gray-900/60 rounded-lg overflow-hidden hover:border-red-500/20 transition-all duration-300"
          >
            {/* Contenedor de la Imagen */}
            <div className="aspect-[3/4] w-full relative overflow-hidden bg-[#05070B]">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-70" />
              
              {/* Botón play flotante proporcional a la tarjeta chica */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-red-500/20">
                <Play size={12} className="text-white fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Detalles compactos */}
            <div className="p-2">
              <h4 className="text-[11px] font-black text-gray-200 uppercase truncate tracking-wide group-hover:text-white transition-colors">
                {item.titulo}
              </h4>
              <p className="text-[9px] text-red-500 font-black uppercase tracking-widest mt-0.5">
                Cap. {item.capituloGuardado}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}