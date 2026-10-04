// src/app/manhwas/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS, Manga } from '@/data/mangas';
import { Star, MessageSquare, Play, Bookmark, Eye, Clock, Loader2, ArrowLeft } from 'lucide-react';

export default function CaratulaPremiumPage() {
  const params = useParams();
  const mangaId = params?.id as string;

  const [manga, setManga] = useState<Manga | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comentarioUser, setComentarioUser] = useState<string>('');

  useEffect(() => {
    if (!mangaId) return;
    setIsLoading(true);

    const encontrado = BASE_DATOS_MANGAS.find(
      (m) => String(m.id).trim().toLowerCase() === String(mangaId).trim().toLowerCase()
    );

    if (encontrado) {
      setManga(encontrado);
    }
    setIsLoading(false);
  }, [mangaId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 size={32} className="animate-spin text-red-600 mb-3" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Cargando serie...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-40 px-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-red-500 mb-2">Manhwa no encontrado</h2>
          <Link href="/" className="inline-block bg-gray-900 border border-gray-800 text-[10px] font-black uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-gray-800 transition-all">
            Volver al Inicio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020306] text-gray-200 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          {/* Volver */}
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={12} className="text-red-500" />
            <span>Volver al inicio</span>
          </Link>

          {/* CABECERA DE LA CARÁTULA */}
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start mb-12">
            {/* Imagen de Portada */}
            <div className="w-full max-w-[240px] mx-auto md:mx-0 aspect-[3/4] rounded-2xl overflow-hidden border border-gray-900 shadow-2xl relative">
              <img src={manga.imagen} alt={manga.titulo} className="w-full h-full object-cover" />
            </div>

            {/* Información Técnica */}
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md self-center md:self-start mb-2">
                Manhwa
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1 text-center md:text-left">
                {manga.titulo}
              </h1>
              <p className="text-xs text-gray-500 font-medium mb-4 text-center md:text-left">Por: Desconocido</p>

              {/* Badges de Stats (Estrellas, Caps, Favoritos) */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-500">
                  <Star size={13} fill="currentColor" />
                  <span>4.9</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400">
                  <MessageSquare size={13} />
                  <span>{manga.capitulos?.length || 0} Capítulos</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold text-pink-500">
                  <span>❤️ 0 Favoritos</span>
                </div>
              </div>

              {/* Botones de Acción directos */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                {manga.capitulos && manga.capitulos.length > 0 ? (
                  <Link href={`/manhwas/${manga.id}/${manga.capitulos[0].id}`} className="bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-600/10">
                    <Play size={12} fill="currentColor" />
                    <span>Empezar a leer</span>
                  </Link>
                ) : null}
                <button className="bg-[#0F1422] border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                  <Bookmark size={12} />
                  <span>Guardar</span>
                </button>
              </div>

              {/* Sinopsis */}
              <div className="border-t border-gray-900/60 pt-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sinopsis</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {manga.sinopsis || 'No hay sinopsis disponible actualmente para esta serie.'}
                </p>
              </div>
            </div>
          </div>

          {/* LISTA DE CAPÍTULOS */}
          <div className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-widest text-white mb-4 border-b border-gray-900 pb-2">
              Lista de Capítulos ({manga.capitulos?.length || 0})
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {manga.capitulos?.map((cap) => (
                <Link
                  key={cap.id}
                  href={`/manhwas/${manga.id}/${cap.id}`}
                  className="flex items-center justify-between p-4 bg-[#0F1422]/40 border border-gray-900/60 rounded-xl hover:bg-[#0F1422]/80 hover:border-gray-800 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 bg-gray-950 border border-gray-800 rounded-lg text-gray-500 group-hover:text-red-500 group-hover:border-red-500/20 transition-colors">
                      <Eye size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200 group-hover:text-white">Capítulo {cap.numero}</h4>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">Prólogo de la serie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600">
                    <Clock size={11} />
                    <span>Hace 2 días</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* COMENTARIOS */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-white mb-4 border-b border-gray-900 pb-2">
              Comentarios (2)
            </h2>
            <div className="bg-[#05070B]/40 border border-gray-900 rounded-xl p-4 mb-4">
              <textarea
                placeholder="Escribe tu opinión sobre este manhwa..."
                value={comentarioUser}
                onChange={(e) => setComentarioUser(e.target.value)}
                className="w-full h-20 bg-gray-950 border border-gray-900 rounded-xl p-3 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-800 resize-none font-medium"
              />
              <div className="flex justify-end mt-2">
                <button className="bg-red-600 hover:bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors">
                  Enviar
                </button>
              </div>
            </div>

            {/* Listado estático de comentarios como en tu imagen */}
            <div className="space-y-3">
              <div className="p-4 bg-[#0F1422]/30 border border-gray-900/60 rounded-xl flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">SO</div>
                <div>
                  <div className="flex items-center gap-2"><span className="text-xs font-black text-gray-300">SoloReader</span><span className="text-[8px] font-mono text-gray-600">HACE 2 HORAS</span></div>
                  <p className="text-xs text-gray-400 font-medium mt-1">¡Este manhwa es una absoluta obra de arte! El diseño de los paneles mejora en cada capítulo.</p>
                </div>
              </div>
              <div className="p-4 bg-[#0F1422]/30 border border-gray-900/60 rounded-xl flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">SH</div>
                <div>
                  <div className="flex items-center gap-2"><span className="text-xs font-black text-gray-300">ShadowDev</span><span className="text-[8px] font-mono text-gray-600">AYER</span></div>
                  <p className="text-xs text-gray-400 font-medium mt-1">Por fin adaptaron esta novela, el ritmo del inicio está perfecto.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}