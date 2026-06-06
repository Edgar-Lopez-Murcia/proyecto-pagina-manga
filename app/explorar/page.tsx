// src/app/explorar/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import Link from 'next/link';
import { Search, Compass, BookOpen, Layers, X } from 'lucide-react';

export default function ExplorarPage() {
  const [busqueda, setBusqueda] = useState<string>('');
  const [mangasFiltrados, setMangasFiltrados] = useState<any[]>(BASE_DATOS_MANGAS);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<string>('Todos');

  // Extraer géneros únicos de la BD de forma dinámica
  const todosLosGeneros = ['Todos', ...Array.from(new Set(BASE_DATOS_MANGAS.flatMap(m => m.generos || [])))];

  useEffect(() => {
    const resultado = BASE_DATOS_MANGAS.filter((manga) => {
      const coincideTexto = manga.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                            manga.sinopsis.toLowerCase().includes(busqueda.toLowerCase());
      
      const coincideGenero = generoSeleccionado === 'Todos' || manga.generos.includes(generoSeleccionado);
      
      return coincideTexto && coincideGenero;
    });
    
    setMangasFiltrados(resultado);
  }, [busqueda, generoSeleccionado]);

  return (
    <main className="min-h-screen bg-[#05070B] text-gray-200 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <div>
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
          
          {/* ENCABEZADO DE LA SECCIÓN */}
          <div className="mb-6 flex items-center gap-2.5">
            <div className="p-2 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl">
              <Compass size={18} />
            </div>
            <div>
              <h1 className="text-base font-black text-white uppercase tracking-wider">Explorar Catálogo</h1>
              <p className="text-[11px] text-gray-500 font-medium">Busca tus obras preferidas y filtra por categorías.</p>
            </div>
          </div>

          {/* CONTROLES DE FILTRADO Y BÚSQUEDA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#0F1422]/20 border border-gray-900/60 p-4 rounded-2xl">
            
            {/* INPUT DE BÚSQUEDA */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por título, palabras clave..."
                className="w-full bg-[#05070B] border border-gray-800 focus:border-red-500 rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium text-gray-200 placeholder-gray-500 outline-none transition-all tracking-wide"
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* FILTROS POR BOTÓN */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto max-w-full md:max-w-md scrollbar-none">
              {todosLosGeneros.map((genero) => (
                <button
                  key={genero}
                  onClick={() => setGeneroSeleccionado(genero)}
                  className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap border ${
                    generoSeleccionado === genero
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/10'
                      : 'bg-gray-900/40 border-gray-900 text-gray-400 hover:text-white hover:border-gray-800'
                  }`}
                >
                  {genero}
                </button>
              ))}
            </div>
          </div>

          {/* CUADRÍCULA DE RESULTADOS */}
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-6">
              <span className="w-1 h-3 bg-red-500 rounded-full" />
              Resultados ({mangasFiltrados.length})
            </h3>

            {mangasFiltrados.length === 0 ? (
              <div className="text-center py-16 bg-[#0F1422]/10 border border-gray-900/40 rounded-2xl px-4">
                <Layers size={24} className="text-gray-700 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sin coincidencias</p>
                <p className="text-[11px] text-gray-600 mt-0.5">Intenta cambiar los términos o la categoría seleccionada.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mangasFiltrados.map((manga) => (
                  <Link
                    key={manga.id}
                    href={`/manhwas/${manga.id}`}
                    className="group flex flex-col bg-[#0F1422]/10 border border-gray-900/40 hover:border-gray-800/80 rounded-xl overflow-hidden p-2 transition-all duration-300"
                  >
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-950 relative">
                      <img src={manga.imagen} alt={manga.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none" loading="lazy" />
                      <span className={`absolute top-2 right-2 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow ${
                        manga.estado === 'Emisión' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-400 border border-gray-800'
                      }`}>
                        {manga.estado}
                      </span>
                    </div>

                    <div className="pt-2.5 pb-1 px-1 flex-1 flex flex-col justify-between">
                      <h4 className="text-xs font-black text-white uppercase tracking-wide truncate group-hover:text-red-400 transition-colors">{manga.titulo}</h4>
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                        <BookOpen size={10} className="text-red-500/70" />
                        <span>{manga.capitulos?.length || 0} Caps</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}