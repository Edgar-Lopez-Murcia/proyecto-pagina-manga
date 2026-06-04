// src/app/series/page.tsx
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Star, BookOpen, Layers, ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function SeriesCatálogoPage() {
  // Estados para los filtros y ordenamiento
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [ordenarPor, setOrdenarPor] = useState<string>('titulo-asc');
  
  // Estado para controlar la apertura del menú desplegable personalizado
  const [dropdownAbierto, setDropdownAbierto] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Opciones de ordenamiento mapeadas con su respectiva etiqueta
  const opcionesOrdenamiento = [
    { id: 'titulo-asc', etiqueta: 'A - Z (Alfabético)' },
    { id: 'titulo-desc', etiqueta: 'Z - A (Invertido)' },
    { id: 'rating-desc', etiqueta: 'Más Valorados' }
  ];

  // Obtener la etiqueta del estado seleccionado actualmente
  const opcionSeleccionada = opcionesOrdenamiento.find(op => op.id === ordenarPor) || opcionesOrdenamiento[0];

  // Cerrar el menú si el usuario hace clic fuera de él
  useEffect(() => {
    function manejarClickAfuera(evento: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(evento.target as Node)) {
        setDropdownAbierto(false);
      }
    }
    document.addEventListener('mousedown', manejarClickAfuera);
    return () => document.removeEventListener('mousedown', manejarClickAfuera);
  }, []);

  // 🛡️ ESCUDO DE DATOS + FILTRADO Y ORDENAMIENTO
  const seriesFiltradasYOrdenadas = useMemo(() => {
    const seriesMapeadas = BASE_DATOS_MANGAS.map((mangaRaw: any) => ({
      id: mangaRaw.id,
      titulo: mangaRaw.titulo || mangaRaw.title || 'Sin título',
      autor: mangaRaw.autor || mangaRaw.author || 'Desconocido',
      imagen: mangaRaw.imagen || mangaRaw.coverUrl || mangaRaw.imagenUrl || '',
      calificacion: mangaRaw.calificacion || mangaRaw.rating || 4.5,
      tipo: mangaRaw.tipo || mangaRaw.type || 'Manhwa',
      capitulos: mangaRaw.capitulos || mangaRaw.chapters || []
    }));

    let resultado = seriesMapeadas;
    if (filtroTipo !== 'todos') {
      resultado = resultado.filter(
        (m) => m.tipo.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    resultado.sort((a, b) => {
      if (ordenarPor === 'titulo-asc') {
        return a.titulo.localeCompare(b.titulo);
      }
      if (ordenarPor === 'titulo-desc') {
        return b.titulo.localeCompare(b.titulo);
      }
      if (ordenarPor === 'rating-desc') {
        return b.calificacion - a.calificacion;
      }
      return 0;
    });

    return resultado;
  }, [filtroTipo, ordenarPor]);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between selection:bg-red-500/20 selection:text-red-400">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          
          {/* ENCABEZADO DE LA PÁGINA */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              Catálogo de Series
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Explora todas las obras disponibles en <span className="text-red-500 font-bold">Sumi</span>.
            </p>
          </div>

          {/* BARRA DE FILTROS INTEGRADOS */}
          <div className="bg-[#0F1422]/40 border border-gray-900/80 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            
            {/* Filtro por Tipo */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Layers size={14} className="text-gray-500 shrink-0 hidden xs:block" />
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider mr-1 hidden md:block">Filtrar:</span>
              <div className="flex gap-1 bg-[#0B0F19] p-1 rounded-xl border border-gray-900 w-full sm:w-auto">
                {['todos', 'manhwa', 'manga', 'manhua'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltroTipo(tipo)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex-1 sm:flex-none ${
                      filtroTipo === tipo
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/10'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenamiento Personalizado (Sin Select nativo ni Emojis) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end relative" ref={dropdownRef}>
              <ArrowUpDown size={14} className="text-gray-500 shrink-0 hidden xs:block" />
              <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider mr-1 hidden md:block">Ordenar por:</span>
              
              <div className="relative w-full sm:w-48">
                {/* Botón Disparador del Dropdown */}
                <button
                  type="button"
                  onClick={() => setDropdownAbierto(!dropdownAbierto)}
                  className="w-full h-9 bg-[#0B0F19] border border-gray-900 hover:border-gray-800 rounded-xl px-3 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-300 transition-all cursor-pointer select-none"
                >
                  <span className="flex items-center gap-1.5">
                    {ordenarPor === 'rating-desc' && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                    {opcionSeleccionada.etiqueta}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${dropdownAbierto ? 'rotate-180' : ''}`} />
                </button>

                {/* Menú Flotante Personalizado */}
                {dropdownAbierto && (
                  <div className="absolute top-11 left-0 right-0 bg-[#0F1422] border border-gray-900 rounded-xl overflow-hidden shadow-2xl z-40 flex flex-col p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {opcionesOrdenamiento.map((opcion) => (
                      <button
                        key={opcion.id}
                        type="button"
                        onClick={() => {
                          setOrdenarPor(opcion.id);
                          setDropdownAbierto(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                          ordenarPor === opcion.id
                            ? 'bg-red-500/10 text-red-400 border border-red-500/10'
                            : 'text-gray-400 hover:bg-[#161D30]/60 hover:text-white'
                        }`}
                      >
                        {opcion.id === 'rating-desc' && (
                          <Star size={12} className={ordenarPor === opcion.id ? 'text-red-400 fill-red-400' : 'text-gray-500 fill-gray-500'} />
                        )}
                        {opcion.etiqueta}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* GRILLA DE CONTENIDO */}
          {seriesFiltradasYOrdenadas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {seriesFiltradasYOrdenadas.map((manga) => (
                <Link 
                  key={manga.id}
                  href={`/manhwas/${manga.id}`}
                  className="group flex flex-col bg-[#0F1422]/20 border border-gray-900/40 hover:border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300 relative"
                >
                  <div className="aspect-[3/4] w-full bg-[#0F1422] relative overflow-hidden">
                    {manga.imagen && (
                      <img 
                        src={manga.imagen} 
                        alt={manga.titulo} 
                        className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0B0F19]/80 backdrop-blur-md border border-gray-800 text-red-400 text-[8px] font-black uppercase tracking-widest rounded">
                      {manga.tipo}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-black text-gray-300 group-hover:text-white uppercase tracking-wide line-clamp-1 transition-colors">
                        {manga.titulo}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold truncate mt-0.5">
                        {manga.autor}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-900/60 pt-2 text-[10px] font-bold text-gray-400">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={11} className="fill-yellow-500" />
                        <span>{manga.calificacion}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <BookOpen size={11} />
                        <span>{manga.capitulos.length} Caps</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-gray-900 rounded-2xl max-w-md mx-auto px-4">
              <SlidersHorizontal size={24} className="text-gray-700 mx-auto mb-3" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">No hay resultados</h3>
              <p className="text-[11px] text-gray-500 mt-1">
                No se encontraron obras que coincidan con la categoría seleccionada en este momento.
              </p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}