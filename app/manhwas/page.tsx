// src/app/manhwas/[id]/[capitulo]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { ArrowLeft, ArrowRight, Menu, Loader2, RefreshCw } from 'lucide-react';

export default function LectorPage() {
  const router = useRouter();
  const params = useParams();
  
  // Convertir parámetros de la URL de forma segura
  const mangaId = params?.id as string;
  const capId = params?.capitulo as string;

  // Estados de carga y almacenamiento de datos
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  const [manga, setManga] = useState<any>(null);
  const [capituloActual, setCapituloActual] = useState<any>(null);

  useEffect(() => {
    // Inicializamos estados de carga al cambiar de capítulo
    setLoadingData(true);
    setLoadingImages(true);

    const timer = setTimeout(() => {
      const mangaEncontrado = BASE_DATOS_MANGAS.find((m) => m.id === mangaId);
      if (mangaEncontrado) {
        setManga(mangaEncontrado);
        
        // Mapeo seguro usando tipado flexible para evitar conflictos con la BD
        const caps = (mangaEncontrado as any).capitulos || (mangaEncontrado as any).chapters || [];
        const capEncontrado = caps.find((c: any) => String(c.id) === String(capId) || String(c.numero) === String(capId));
        
        setCapituloActual(capEncontrado || null);

        // Guardar automáticamente el progreso de lectura en LocalStorage para el perfil
        if (capEncontrado) {
          const progresoRaw = localStorage.getItem('sumi_progreso') || '{}';
          try {
            const progreso = JSON.parse(progresoRaw);
            progreso[mangaId] = capId; // Mapea este manga con su último capítulo leído
            localStorage.setItem('sumi_progreso', JSON.stringify(progreso));
          } catch (e) {
            console.error('Error guardando progreso:', e);
          }
        }
      }
      setLoadingData(false);
    }, 400); // Pequeña ventana de tiempo para sincronizar estados fluidamente

    return () => clearTimeout(timer);
  }, [mangaId, capId]);

  // Buscar índices para la paginación (Siguiente / Anterior)
  const listaCapitulos = manga?.capitulos || manga?.chapters || [];
  const indexActual = listaCapitulos.findIndex((c: any) => String(c.id) === String(capId));
  const capAnterior = indexActual > 0 ? listaCapitulos[indexActual - 1] : null;
  const capSiguiente = indexActual < listaCapitulos.length - 1 ? listaCapitulos[indexActual + 1] : null;

  // Manejar la precarga completa de las imágenes pesadas del Manhwa
  useEffect(() => {
    if (!loadingData && capituloActual?.paginas?.length) {
      let imagenesCargadas = 0;
      const totalImagenes = capituloActual.paginas.length;

      capituloActual.paginas.forEach((src: string) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imagenesCargadas++;
          if (imagenesCargadas === totalImagenes) {
            setLoadingImages(false); // Apaga el loader sólo cuando estén renderizadas en buffer
          }
        };
        img.onerror = () => {
          imagenesCargadas++;
          if (imagenesCargadas === totalImagenes) {
            setLoadingImages(false);
          }
        };
      });
    } else if (!loadingData && !capituloActual?.paginas?.length) {
      setLoadingImages(false);
    }
  }, [loadingData, capituloActual]);

  // Renderizado de error si el contenido no existe en data/mangas.ts
  if (!loadingData && (!manga || !capituloActual)) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-32 px-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-red-500 mb-2">Contenido no disponible</h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">El manhwa o capítulo que buscas no existe en el catálogo.</p>
          <Link href="/" className="inline-block bg-gray-900 border border-gray-800 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-gray-800 transition-all">
            Volver al inicio
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

        {/* TOP BAR FIXED (Control de lectura superior) */}
        <div className="fixed top-16 left-0 right-0 h-14 bg-[#05070B]/80 backdrop-blur-md border-b border-gray-900/60 z-40 flex items-center justify-between px-4 max-w-5xl mx-auto rounded-b-xl shadow-xl shadow-black/20">
          <Link href={`/manhwas/${mangaId}`} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors max-w-[40%] truncate">
            <ArrowLeft size={14} className="text-red-500" />
            <span className="uppercase tracking-wider truncate">{manga?.titulo || manga?.title}</span>
          </Link>

          <div className="text-xs font-black uppercase tracking-widest text-white bg-gray-900/50 border border-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Menu size={12} className="text-red-500" />
            <span>Cap. {capituloActual?.numero || capId}</span>
          </div>

          <div className="flex items-center gap-2">
            {capAnterior ? (
              <Link href={`/manhwas/${mangaId}/${capAnterior.id}`} className="p-2 bg-gray-900 border border-gray-800 hover:border-red-500 text-gray-400 hover:text-white rounded-lg transition-all">
                <ArrowLeft size={14} />
              </Link>
            ) : (
              <div className="p-2 bg-gray-900/30 border border-gray-900/10 text-gray-700 rounded-lg cursor-not-allowed"><ArrowLeft size={14} /></div>
            )}

            {capSiguiente ? (
              <Link href={`/manhwas/${mangaId}/${capSiguiente.id}`} className="p-2 bg-gray-900 border border-gray-800 hover:border-red-500 text-gray-400 hover:text-white rounded-lg transition-all">
                <ArrowRight size={14} />
              </Link>
            ) : (
              <div className="p-2 bg-gray-900/30 border border-gray-900/10 text-gray-700 rounded-lg cursor-not-allowed"><ArrowRight size={14} /></div>
            )}
          </div>
        </div>

        {/* LECTOR EN CASCADA COMPLETO */}
        <div className="pt-36 pb-20 max-w-3xl mx-auto px-0 sm:px-4 flex flex-col items-center min-h-[70vh] justify-center">
          
          {/* ESTRUCTURA DE CARGA TIPO SKELETON */}
          {(loadingData || loadingImages) ? (
            <div className="w-full space-y-4 animate-pulse px-4">
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
                <Loader2 size={24} className="animate-spin text-red-600 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Optimizando imágenes...</span>
              </div>
              <div className="w-full h-96 bg-[#0F1422]/20 border border-gray-900/50 rounded-xl" />
              <div className="w-full h-96 bg-[#0F1422]/20 border border-gray-900/50 rounded-xl" />
            </div>
          ) : (
            /* RENDER DE VIÑETAS REALES SIN CORTES */
            <div className="w-full flex flex-col items-center bg-black/40 shadow-2xl shadow-black/80 rounded-2xl overflow-hidden border border-gray-900/30">
              {capituloActual?.paginas?.map((url: string, index: number) => (
                <img
                  key={index}
                  src={url}
                  alt={`Hoja ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-contain block select-none pointer-events-none"
                />
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION (Controles de pie de página) */}
        {!loadingData && !loadingImages && (
          <div className="max-w-md mx-auto px-4 pb-20 flex flex-col items-center gap-4">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Capítulo leído completo</p>
            <div className="w-full grid grid-cols-2 gap-4">
              {capAnterior ? (
                <Link href={`/manhwas/${mangaId}/${capAnterior.id}`} className="bg-[#0F1422]/40 border border-gray-900 hover:border-gray-800 p-4 rounded-xl flex flex-col items-center justify-center gap-1 group transition-all">
                  <ArrowLeft size={16} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">Anterior</span>
                </Link>
              ) : (
                <div className="bg-gray-900/10 border border-gray-900/50 p-4 rounded-xl opacity-40 flex flex-col items-center justify-center gap-1 cursor-not-allowed">
                  <ArrowLeft size={16} className="text-gray-700" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-700">Llegaste al inicio</span>
                </div>
              )}

              {capSiguiente ? (
                <Link href={`/manhwas/${mangaId}/${capSiguiente.id}`} className="bg-red-600 hover:bg-red-500 shadow-xl shadow-red-600/10 p-4 rounded-xl flex flex-col items-center justify-center gap-1 group transition-all">
                  <ArrowRight size={16} className="text-white" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-white">Siguiente</span>
                </Link>
              ) : (
                <Link href={`/manhwas/${mangaId}`} className="bg-[#0F1422]/40 border border-gray-900 hover:border-gray-800 p-4 rounded-xl flex flex-col items-center justify-center gap-1 group transition-all">
                  <RefreshCw size={16} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-500">Volver a Ficha</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}