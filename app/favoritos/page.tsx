// src/app/favoritos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Star, BookOpen, Trash2, HeartCrack } from 'lucide-react';

export default function FavoritosPage() {
  const [listaFavoritos, setListaFavoritos] = useState<any[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // 1. Cargar favoritos desde LocalStorage e interceptar con la base de datos simulada
  useEffect(() => {
    const obtenerFavoritos = () => {
      const favoritosGuardados = localStorage.getItem('sumi-favoritos');
      if (favoritosGuardados) {
        const idsFavoritos: string[] = JSON.parse(favoritosGuardados);
        
        // Filtramos y mapeamos las coincidencias aplicando el Escudo de Datos
        const filtrados = BASE_DATOS_MANGAS.filter((m) => idsFavoritos.includes(m.id)).map((mangaRaw: any) => ({
          id: mangaRaw.id,
          titulo: mangaRaw.titulo || mangaRaw.title || 'Sin título',
          autor: mangaRaw.autor || mangaRaw.author || 'Desconocido',
          imagen: mangaRaw.imagen || mangaRaw.coverUrl || mangaRaw.imagenUrl || '',
          calificacion: mangaRaw.calificacion || mangaRaw.rating || 4.5,
          tipo: mangaRaw.tipo || mangaRaw.type || 'Manhwa',
          capitulos: mangaRaw.capitulos || mangaRaw.chapters || []
        }));
        
        setListaFavoritos(filtrados);
      }
      setCargando(false);
    };

    obtenerFavoritos();
  }, []);

  // 2. Función para eliminar un manhwa de favoritos directamente desde esta lista
  const eliminarDeFavoritos = (idManga: string, e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el clic redirija a la página de detalles
    
    const favoritosGuardados = localStorage.getItem('sumi-favoritos');
    if (favoritosGuardados) {
      let idsFavoritos: string[] = JSON.parse(favoritosGuardados);
      idsFavoritos = idsFavoritos.filter((id) => id !== idManga);
      
      // Actualizar LocalStorage
      localStorage.setItem('sumi-favoritos', JSON.stringify(idsFavoritos));
      
      // Actualizar estado local para remover la tarjeta con animación
      setListaFavoritos(listaFavoritos.filter((m) => m.id !== idManga));
      
      // Disparar evento global para que el Navbar actualice su contador de inmediato
      window.dispatchEvent(new Event('favoritosActualizados'));
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between selection:bg-red-500/20 selection:text-red-400">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          
          {/* ENCABEZADO */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              Mi Biblioteca
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Gestiona tus manhwas, mangas y manhuas guardados para leer más tarde.
            </p>
          </div>

          {/* ESTADO DE CARGA */}
          {cargando ? (
            <div className="py-24 text-center text-xs font-bold text-gray-600 uppercase tracking-widest">
              Sincronizando biblioteca...
            </div>
          ) : listaFavoritos.length > 0 ? (
            /* GRILLA DE FAVORITOS GUARDADOS */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {listaFavoritos.map((manga) => (
                <div 
                  key={manga.id}
                  className="group flex flex-col bg-[#0F1422]/20 border border-gray-900/40 hover:border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300 relative"
                >
                  {/* Contenedor de Imagen */}
                  <Link href={`/manhwas/${manga.id}`} className="aspect-[3/4] w-full bg-[#0F1422] relative overflow-hidden block">
                    {manga.imagen && (
                      <img 
                        src={manga.imagen} 
                        alt={manga.titulo} 
                        className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Badge de Tipo */}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0B0F19]/80 backdrop-blur-md border border-gray-800 text-red-400 text-[8px] font-black uppercase tracking-widest rounded">
                      {manga.tipo}
                    </span>

                    {/* Botón Flotante para Eliminar con SVG */}
                    <button
                      type="button"
                      onClick={(e) => eliminarDeFavoritos(manga.id, e)}
                      className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500/90 text-gray-400 hover:text-white rounded-xl backdrop-blur-md border border-gray-800/40 hover:border-red-600 transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Quitar de favoritos"
                    >
                      <Trash2 size={12} />
                    </button>
                  </Link>

                  {/* Datos del Manhwa */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
                    <Link href={`/manhwas/${manga.id}`}>
                      <h3 className="text-xs font-black text-gray-300 group-hover:text-white uppercase tracking-wide line-clamp-1 transition-colors">
                        {manga.titulo}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold truncate mt-0.5">
                        {manga.autor}
                      </p>
                    </Link>

                    {/* Fila inferior de Metadatos */}
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
                </div>
              ))}
            </div>
          ) : (
            /* DISEÑO DE PÁGINA VACÍA (Con SVG, sin emojis) */
            <div className="py-24 text-center border border-dashed border-gray-900 rounded-2xl max-w-md mx-auto px-4">
              <HeartCrack size={32} className="text-gray-800 mx-auto mb-4" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">Tu biblioteca está vacía</h3>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                Aún no has guardado ninguna serie. Explora el catálogo o usa el buscador para añadir tus manhwas preferidos.
              </p>
              <Link 
                href="/series" 
                className="inline-block mt-6 px-4 py-2.5 bg-[#0F1422] border border-gray-900 hover:border-gray-800 text-gray-300 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Ir al catálogo
              </Link>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}