// src/app/manhwas/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { ChevronDown, ChevronUp, Play, Heart, Calendar, Star, BookOpen } from 'lucide-react';

export default function DetalleManhwaPage() {
  const params = useParams();
  const router = useRouter();
  const idManga = params?.id as string;

  // Buscar el manhwa en nuestra base de datos simulada
  const manga = BASE_DATOS_MANGAS.find((m) => m.id === idManga) as any;
  // Estados de la interfaz
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
  const [esFavorito, setEsFavorito] = useState<boolean>(false);
  const [contadorFavoritos, setContadorFavoritos] = useState<number>(manga?.favoritos || 0);
  const [capitulosLeidos, setCapitulosLeidos] = useState<string[]>([]);

  // 1. Cargar historial de capítulos leídos e inicializar visitas
  useEffect(() => {
    if (!idManga) return;

    // Cargar leídos
    const guardados = localStorage.getItem(`leidos-${idManga}`);
    if (guardados) {
      setCapitulosLeidos(JSON.parse(guardados));
    }

    // Registrar visita simulada
    const visitasGuardadas = localStorage.getItem(`visitas-${idManga}`);
    if (!visitasGuardadas) {
      localStorage.setItem(`visitas-${idManga}`, 'true');
    }
  }, [idManga]);

  // 2. Cargar el estado de favorito desde LocalStorage al iniciar
  useEffect(() => {
    if (!idManga) return;
    const favoritosGuardados = localStorage.getItem('sumi-favoritos');
    if (favoritosGuardados) {
      const listaFavs = JSON.parse(favoritosGuardados);
      setEsFavorito(listaFavs.includes(idManga));
    }
  }, [idManga]);

  // Si no se encuentra el manhwa en la data
  if (!manga) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <h2 className="text-xl font-bold text-gray-400">Manhwa no encontrado</h2>
          <button onClick={() => router.push('/manhwas')} className="mt-4 text-red-500 font-bold hover:underline">
            Volver al catálogo
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  // 3. Lógica para guardar o remover de favoritos de forma dinámica
  const alternarFavorito = () => {
    const favoritosGuardados = localStorage.getItem('sumi-favoritos');
    let listaFavs = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

    if (esFavorito) {
      listaFavs = listaFavs.filter((favId: string) => favId !== idManga);
      setContadorFavoritos((prev) => Math.max(0, prev - 1));
    } else {
      listaFavs.push(idManga);
      setContadorFavoritos((prev) => prev + 1);
    }

    localStorage.setItem('sumi-favoritos', JSON.stringify(listaFavs));
    setEsFavorito(!esFavorito);

    // Lanzamos el evento global para avisarle al Navbar que actualice el número al instante
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  // Control de lista de capítulos colapsable usando ?. para evitar errores de tipo
  const capitulosVisibles = mostrarTodos 
    ? (manga?.capitulos || []) 
    : (manga?.capitulos?.slice(0, 5) || []);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* HERO BANNER CON BLUR DE FONDO */}
        <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-20"
            style={{ backgroundImage: `url(${manga?.imagen})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/70 to-[#0B0F19]" />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-40 md:-mt-52 relative z-10 mb-20">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            
            {/* PORTADA PRINCIPAL */}
            <div className="w-48 sm:w-56 md:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex-shrink-0">
              <img src={manga?.imagen} alt={manga?.titulo} className="w-full h-full object-cover select-none" />
            </div>

            {/* DETALLES DE LA OBRA */}
            <div className="flex-1 text-center md:text-left pt-2 md:pt-14">
              <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-[11px] font-black tracking-wider uppercase">
                {manga?.tipo}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3 uppercase tracking-wide leading-tight">
                {manga?.titulo}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium italic mt-1 text-red-400/80">
                Por: {manga?.autor}
              </p>

              {/* CONTADORES METRICOS */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-xs text-gray-400 font-bold">
                <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-xl">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-white">{manga?.calificacion}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-xl">
                  <BookOpen size={14} className="text-blue-400" />
                  <span>{manga?.visitas} Lecturas</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-xl">
                  <Heart size={14} className="text-red-500 fill-red-500" />
                  <span>{contadorFavoritos} Favoritos</span>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN PRINCIPAL */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                <button 
                  onClick={() => router.push(`/ver/${manga?.id}/capitulo-1`)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/10 cursor-pointer"
                >
                  <Play size={14} className="fill-white" /> Empezar a Leer
                </button>
                
                <button 
                  onClick={alternarFavorito}
                  className={`w-full sm:w-auto px-6 py-3.5 border font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    esFavorito 
                      ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" 
                      : "bg-gray-900/40 border-gray-800 text-gray-300 hover:bg-gray-800/50"
                  }`}
                >
                  <Heart size={14} className={esFavorito ? "fill-red-400" : ""} />
                  {esFavorito ? "Guardado" : "Guardar"}
                </button>
              </div>
            </div>

          </div>

          {/* SINOPSIS */}
          <div className="mt-12 bg-[#0F1422]/60 border border-gray-900 p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">Sinopsis</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">{manga?.sinopsis}</p>
          </div>

          {/* LISTA DE CAPÍTULOS */}
          <div className="mt-10">
            <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Lista de Capítulos</h3>
              <span className="text-[11px] font-bold text-gray-500 bg-gray-900 px-2 py-0.5 rounded-md border border-gray-800">
                {manga?.capitulos?.length || 0} Caps
              </span>
            </div>

          <div className="flex flex-col gap-2.5">
            {capitulosVisibles.map((cap: any) => { // 🆕 Le añadimos ': any' aquí
              const esLeido = capitulosLeidos.includes(cap.id.toString());
              return (
                <div 
                  key={cap.id}
                    onClick={() => router.push(`/ver/${manga?.id}/capitulo-${cap.id}`)}
                    className="w-full bg-[#0F1422]/40 hover:bg-[#131A2E]/60 border border-gray-900/60 p-4 rounded-xl flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-all ${esLeido ? 'bg-green-500 shadow-md shadow-green-500/40' : 'bg-transparent'}`} />
                      <div>
                        <span className={`text-xs font-black uppercase transition-colors ${esLeido ? 'text-gray-500' : 'text-gray-200 group-hover:text-red-400'}`}>
                          Capítulo {cap.id}
                        </span>
                        <span className="block text-[10px] text-gray-500 mt-0.5 font-medium">
                          {cap.titulo}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold">
                      <Calendar size={12} />
                      <span>{cap.fecha}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTÓN MOSTRAR MÁS / MENOS */}
            {(manga?.capitulos?.length || 0) > 5 && (
              <button 
                onClick={() => setMostrarTodos(!mostrarTodos)}
                className="w-full mt-4 py-3 bg-[#0F1422]/30 hover:bg-[#0F1422]/60 border border-gray-900 text-xs font-black text-gray-400 hover:text-white rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {mostrarTodos ? (
                  <>Mostrar menos <ChevronUp size={14} /></>
                ) : (
                  <>Mostrar más capítulos ({((manga?.capitulos?.length || 0) - 5)}) <ChevronDown size={14} /></>
                )}
              </button>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}