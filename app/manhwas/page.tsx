// src/app/manhwas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MangaCard from '@/components/MangaCard';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function CatatogoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Leer el género desde la URL (ej: ?genero=accion)
  const generoQuery = searchParams?.get('genero') || '';

  // Estados
  const [busqueda, setBusqueda] = useState<string>('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string>(generoQuery);
  const [mangasFiltrados, setMangasFiltrados] = useState<any[]>(BASE_DATOS_MANGAS);

  // Sincronizar el estado local si el género cambia desde el Navbar
  useEffect(() => {
    setGeneroSeleccionado(generoQuery);
  }, [generoQuery]);

  // Lógica de filtrado combinada (Buscador + Género)
  useEffect(() => {
    let resultado = BASE_DATOS_MANGAS;

    // Filtro por término de búsqueda
    if (busqueda.trim() !== '') {
      resultado = resultado.filter((manga: any) => // 🆕 Añadimos ': any' aquí
        manga.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        manga.autor.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por género de la URL/Botón
    if (generoSeleccionado !== '') {
      resultado = resultado.filter((manga: any) => // 🆕 Añadimos ': any' aquí
        manga.generos?.some((g: string) => g.toLowerCase() === generoSeleccionado.toLowerCase())
      );
    }

    setMangasFiltrados(resultado);
    }, [busqueda, generoSeleccionado]);

  // Cambiar género y actualizar la URL de forma limpia
  const manejarCambioGenero = (genero: string) => {
    setGeneroSeleccionado(genero);
    if (genero === '') {
      router.push('/manhwas');
    } else {
      router.push(`/manhwas?genero=${genero.toLowerCase()}`);
    }
  };

  // Limpiar todos los filtros activos
  const limpiarFiltros = () => {
    setBusqueda('');
    setGeneroSeleccionado('');
    router.push('/manhwas');
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 mb-20">
          
          {/* BARRA DE BÚSQUEDA Y CONTROL DE FILTROS */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0F1422]/60 border border-gray-900 p-4 rounded-2xl shadow-xl mb-10">
            
            {/* Input Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar por título o autor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-[#070A12] border border-gray-800 focus:border-red-500/50 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-white placeholder-gray-500 outline-none transition-colors"
              />
              {busqueda && (
                <button 
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Píldoras de Filtros Rápidos */}
            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-start md:justify-end">
              <div className="text-gray-500 p-2 hidden sm:block">
                <SlidersHorizontal size={16} />
              </div>
              
              <button
                onClick={() => manejarCambioGenero('')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                  generoSeleccionado === ''
                    ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/10'
                    : 'bg-[#070A12] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                Todos
              </button>

              {['Accion', 'Isekai', 'Romance'].map((gen) => (
                <button
                  key={gen}
                  onClick={() => manejarCambioGenero(gen)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                    generoSeleccionado.toLowerCase() === gen.toLowerCase()
                      ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/10'
                      : 'bg-[#070A12] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {gen === 'Accion' ? 'Acción' : gen}
                </button>
              ))}
            </div>
          </div>

          {/* INDICADOR DE FILTRO ACTIVO */}
          {(generoSeleccionado || busqueda) && (
            <div className="flex items-center justify-between mb-6 bg-blue-500/5 border border-blue-500/10 px-4 py-2.5 rounded-xl text-xs text-gray-400">
              <div>
                Resultados para:{' '}
                {busqueda && <span className="text-white font-bold">"{busqueda}"</span>}
                {busqueda && generoSeleccionado && ' + '}
                {generoSeleccionado && (
                  <span className="text-red-400 font-bold uppercase tracking-wider">
                    {generoSeleccionado === 'accion' ? 'Acción' : generoSeleccionado}
                  </span>
                )}
              </div>
              <button 
                onClick={limpiarFiltros}
                className="text-blue-400 hover:text-blue-300 font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                Limpiar todo <X size={14} />
              </button>
            </div>
          )}

          {/* CUADRÍCULA DE RESULTADOS */}
          {mangasFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {mangasFiltrados.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          ) : (
            /* No se encontraron resultados */
            <div className="py-24 text-center max-w-sm mx-auto">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">No hay coincidencias</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                No encontramos ningún manhwa que coincida con los filtros seleccionados. Intenta buscando con otro término.
              </p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}