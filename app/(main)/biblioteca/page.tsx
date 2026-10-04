'use client';

import React, { useState, useEffect } from 'react';
import MangaCard from '@/components/MangaCard';
import { mangas } from '@/data/mangas';
import type { Manga } from '@/types';
import { Heart, BookOpen, Trash2 } from 'lucide-react';

export default function BibliotecaPage() {
  const [misFavoritos, setMisFavoritos] = useState<Manga[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  const cargarFavoritos = () => {
    const favoritosGuardados = localStorage.getItem('sumi-favoritos');
    if (favoritosGuardados) {
      const listaIds = JSON.parse(favoritosGuardados);
      const filtrados = mangas.filter((manga) => listaIds.includes(manga.id));
      setMisFavoritos(filtrados);
    } else {
      setMisFavoritos([]);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarFavoritos();
    window.addEventListener('favoritosActualizados', cargarFavoritos);
    return () => {
      window.removeEventListener('favoritosActualizados', cargarFavoritos);
    };
  }, []);

  const eliminarDeFavoritos = (idManga: string) => {
    const favoritosGuardados = localStorage.getItem('sumi-favoritos');
    if (!favoritosGuardados) return;

    let listaIds = JSON.parse(favoritosGuardados);
    listaIds = listaIds.filter((id: string) => id !== idManga);
    localStorage.setItem('sumi-favoritos', JSON.stringify(listaIds));

    const filtrados = mangas.filter((manga) => listaIds.includes(manga.id));
    setMisFavoritos(filtrados);
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
      <div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-6">
          <div className="flex items-center gap-3 border-b border-gray-900 pb-5">
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
              <Heart size={22} className="fill-red-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Mi Biblioteca
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Tienes {misFavoritos.length} {misFavoritos.length === 1 ? 'serie guardada' : 'series guardadas'}
              </p>
            </div>
          </div>

          {cargando ? (
            <div className="py-20 text-center text-xs font-bold text-gray-500 uppercase tracking-widest animate-pulse">
              Cargando tu biblioteca...
            </div>
          ) : misFavoritos.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#0F1422] border border-gray-900 rounded-2xl flex items-center justify-center text-gray-600 mb-4 shadow-xl">
                <BookOpen size={28} />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Tu biblioteca está vacía
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium mt-2 px-4">
                Explora el catálogo de Sumi, encuentra tus manhwas favoritos y presiona el botón "Guardar" para tenerlos siempre a la mano aquí.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 mt-10">
              {misFavoritos.map((manga) => (
                <div key={manga.id} className="relative group">
                  <button
                    onClick={() => eliminarDeFavoritos(manga.id)}
                    className="absolute top-2 right-2 z-20 p-2 bg-black/70 hover:bg-red-600 border border-gray-800/40 hover:border-red-500 rounded-lg text-gray-400 hover:text-white backdrop-blur-sm transition-all shadow-md opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 size={14} />
                  </button>
                  <MangaCard manga={manga} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}