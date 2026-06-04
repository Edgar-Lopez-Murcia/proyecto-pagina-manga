// src/app/ver/[id]/[capitulo]/page.tsx
'use client';

import React, { useMemo, use } from 'react'; // Importamos 'use' directamente de React
import Link from 'next/link';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

interface LectorProps {
  params: Promise<{
    id: string;
    capitulo: string;
  }>; // Tipamos params como una Promesa según los nuevos estándares
}

export default function LectorPage({ params }: LectorProps) {
  // 🔄 DESENVOLVER PARAMS: Resolvemos la promesa de la URL de forma segura
  const { id: idManga, capitulo: idCapitulo } = use(params);

  // 🛡️ ESCUDO DE DATOS: Buscamos la obra normalizando las propiedades en español e inglés
  const manga = useMemo(() => {
    if (!idManga) return null;
    const encontrado = BASE_DATOS_MANGAS.find((m: any) => m.id?.toString() === idManga.toString()) as any;
    if (!encontrado) return null;

    return {
      id: encontrado.id,
      titulo: encontrado.titulo || encontrado.title || 'Sin título',
      capitulos: encontrado.capitulos || encontrado.chapters || []
    };
  }, [idManga]);

  // 🔄 CÁLCULO DE NAVEGACIÓN COMPLETO (Soporta IDs numéricos y de texto de forma segura)
  const navegacion = useMemo(() => {
    if (!manga || !idCapitulo || manga.capitulos.length === 0) {
      return { actual: null, anterior: null, siguiente: null };
    }

    // Buscamos el índice forzando la comparación a string e inspeccionando campos comunes
    const indiceActual = manga.capitulos.findIndex((c: any) => {
      const identificadorCapitulo = c.id !== undefined ? c.id : (c.numero !== undefined ? c.numero : c.num);
      if (identificadorCapitulo === undefined) return false;
      
      return identificadorCapitulo.toString() === idCapitulo.toString();
    });

    if (indiceActual === -1) return { actual: null, anterior: null, siguiente: null };

    const actual = manga.capitulos[indiceActual];

    // Mapeo adaptativo para las propiedades de imágenes dentro del capítulo
    const imagenesNormalizadas = actual.imagenes || actual.images || actual.paginas || [];

    // Control de paginación cronológica (Índice 0 = Primer capítulo cargado)
    const anterior = indiceActual > 0 ? manga.capitulos[indiceActual - 1] : null;
    const siguiente = indiceActual < manga.capitulos.length - 1 ? manga.capitulos[indiceActual + 1] : null;

    return {
      actual: {
        ...actual,
        imagenes: imagenesNormalizadas
      },
      anterior,
      siguiente
    };
  }, [manga, idCapitulo]);

  if (!manga || !navegacion.actual) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
        <Navbar />
        <div className="py-32 text-center max-w-md mx-auto px-4">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Capítulo no encontrado</h3>
          <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
            El contenido que intentas leer no existe o ha sido movido en la base de datos de Sumi.
          </p>
          <Link href="/series" className="inline-block mt-6 px-4 py-2.5 bg-[#0F1422] border border-gray-900 text-gray-300 text-[10px] font-black uppercase tracking-widest rounded-xl">
            Volver al catálogo
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Identificadores de ruta calculados de forma segura con tipado dinámico para evitar conflictos de alcance
  const idAnteriorSeguro = navegacion.anterior 
    ? ((navegacion.anterior as any).id !== undefined ? (navegacion.anterior as any).id : ((navegacion.anterior as any).numero || (navegacion.anterior as any).num))
    : null;

  const idSiguienteSeguro = navegacion.siguiente 
    ? ((navegacion.siguiente as any).id !== undefined ? (navegacion.siguiente as any).id : ((navegacion.siguiente as any).numero || (navegacion.siguiente as any).num))
    : null;

  // Componente interno reutilizable para la barra de controles
  const BarraControles = () => (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 bg-[#0F1422]/60 border border-gray-900/80 p-3 rounded-2xl backdrop-blur-md">
      {/* Botón Capítulo Anterior */}
      {navegacion.anterior && idAnteriorSeguro !== null ? (
        <Link
          href={`/ver/${manga.id}/${idAnteriorSeguro}`}
          className="flex items-center gap-1.5 h-9 px-4 bg-[#0B0F19] border border-gray-900 hover:border-gray-800 text-[10px] font-black uppercase tracking-wider text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer"
        >
          <ChevronLeft size={14} className="text-gray-500" />
          <span className="hidden xs:block">Anterior</span>
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-1.5 h-9 px-4 bg-[#0B0F19]/20 border border-gray-900/20 text-[10px] font-black uppercase tracking-wider text-gray-600 rounded-xl opacity-40 cursor-not-allowed"
        >
          <ChevronLeft size={14} />
          <span className="hidden xs:block">Anterior</span>
        </button>
      )}

      {/* Selector / Indicador Central */}
      <Link 
        href={`/manhwas/${manga.id}`}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
      >
        <BookOpen size={13} />
        <span className="max-w-[120px] xs:max-w-none truncate">
          {navegacion.actual.titulo || navegacion.actual.title || `Capítulo ${idCapitulo}`}
        </span>
      </Link>

      {/* Botón Siguiente Capítulo */}
      {navegacion.siguiente && idSiguienteSeguro !== null ? (
        <Link
          href={`/ver/${manga.id}/${idSiguienteSeguro}`}
          className="flex items-center gap-1.5 h-9 px-4 bg-red-500 hover:bg-red-600 text-[10px] font-black uppercase tracking-wider text-white rounded-xl shadow-lg shadow-red-500/10 transition-all cursor-pointer"
        >
          <span className="hidden xs:block">Siguiente</span>
          <ChevronRight size={14} />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-1.5 h-9 px-4 bg-[#0B0F19]/20 border border-gray-900/20 text-[10px] font-black uppercase tracking-wider text-gray-600 rounded-xl opacity-40 cursor-not-allowed"
        >
          <span className="hidden xs:block">Siguiente</span>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between selection:bg-red-500/20 selection:text-red-400">
      <div>
        <Navbar />

        {/* CONTENIDO DEL LECTOR */}
        <div className="max-w-3xl mx-auto px-4 pt-32 pb-16 flex flex-col gap-6">
          
          <div className="text-center mb-2">
            <h1 className="text-xs font-black text-gray-500 uppercase tracking-widest block mb-1">
              {manga.titulo}
            </h1>
          </div>

          {/* 1. BARRA DE CONTROLES SUPERIOR */}
          <BarraControles />

          {/* 🖼️ CASCADA DE IMÁGENES DEL CAPÍTULO */}
          <div className="w-full flex flex-col bg-[#070A11] border border-gray-900/60 rounded-2xl overflow-hidden my-4 shadow-2xl">
            {navegacion.actual.imagenes && navegacion.actual.imagenes.length > 0 ? (
              navegacion.actual.imagenes.map((urlImg: string, index: number) => (
                <img
                  key={index}
                  src={urlImg}
                  alt={`Página ${index + 1}`}
                  className="w-full h-auto object-contain select-none pointer-events-none"
                  loading={index <= 2 ? "eager" : "lazy"}
                />
              ))
            ) : (
              <div className="py-32 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                No hay imágenes cargadas para este capítulo.
              </div>
            )}
          </div>

          {/* 2. BARRA DE CONTROLES INFERIOR */}
          <BarraControles />

        </div>
      </div>

      <Footer />
    </main>
  );
}