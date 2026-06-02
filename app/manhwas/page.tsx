// src/app/manhwas/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MangaCard from '@/components/MangaCard';
import { Manga } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ManhwasPage() {
  // 1. Estado para controlar el texto que escribe el usuario en el buscador
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Base de datos simulada de Manhwas (Coreanos)
  const listaManhwas: Manga[] = [
    { 
      id: '1', 
      title: 'Solo Leveling: Ragnarok', 
      coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.9, 
      chaptersCount: 30, 
      latestChapter: 'Cap. 29', 
      updatedAt: 'Hace 5m' 
    },
    { 
      id: '2', 
      title: 'Omniscient Reader Viewpoint', 
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.8, 
      chaptersCount: 120, 
      latestChapter: 'Cap. 119', 
      updatedAt: 'Hace 1h' 
    },
    { 
      id: '3', 
      title: 'The Beginning After The End', 
      coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.7, 
      chaptersCount: 160, 
      latestChapter: 'Cap. 159', 
      updatedAt: 'Hace 2h' 
    },
    { 
      id: '4', 
      title: 'Tower of God', 
      coverUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.5, 
      chaptersCount: 600, 
      latestChapter: 'Cap. 598', 
      updatedAt: 'Ayer' 
    },
  ];

  // 2. Filtro lógico en tiempo real: Filtra la lista según lo escrito por el usuario
  const manhwasFiltrados = listaManhwas.filter((manhwa) =>
    manhwa.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] pb-0 selection:bg-red-500/30 selection:text-red-300">
      {/* Navbar Superior */}
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
        {/* Encabezado de la Sección */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">Explorar Manhwas</h1>
            <p className="text-xs text-gray-500 mt-1">Descubre los cómics coreanos más leídos y populares</p>
          </div>

          {/* Barra de Búsqueda Estilizada */}
          <div className="flex items-center gap-3 w-full md:w-80">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Buscar manhwa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111827] border border-gray-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
              />
            </div>
            <button className="p-2.5 bg-[#111827] border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer" title="Filtros avanzados">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* 3. Cuadrícula de Contenido Filtrado */}
        {manhwasFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
            {manhwasFiltrados.map((manhwa) => (
              <MangaCard key={manhwa.id} manga={manhwa} />
            ))}
          </div>
        ) : (
          /* Estado Vacío por si la búsqueda no arroja resultados */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-lg font-medium">No encontramos ningún manhwa que coincida con tu búsqueda.</p>
            <p className="text-xs text-gray-600 mt-1">Prueba revisando que el nombre esté bien escrito.</p>
          </div>
        )}
      </div>

      {/* Footer Global */}
      <Footer />
    </main>
  );
}