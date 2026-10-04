'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mangas } from '@/data/mangas';
import type { Manga, Chapter } from '@/types';
import { ArrowLeft, Loader2, Layers, ChevronLeft, ChevronRight, Sun, Settings, Maximize2 } from 'lucide-react';

export default function LectorPage() {
  const params = useParams();
  const router = useRouter();
  const mangaId = params?.id as string;
  const capId = params?.capitulo as string;

  const [manga, setManga] = useState<Manga | null>(null);
  const [capituloActual, setCapituloActual] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modoLectura, setModoLectura] = useState<'cascada' | 'paginado'>('cascada');
  const [paginaActual, setPaginaActual] = useState<number>(0);
  const [anchoImagen, setAnchoImagen] = useState<'max' | 'md' | 'sm'>('md');
  const [brillo, setBrillo] = useState<number>(100);
  const [mostrarMenuAjustes, setMostrarMenuAjustes] = useState<boolean>(false);
  const [idAnterior, setIdAnterior] = useState<string | null>(null);
  const [idSiguiente, setIdSiguiente] = useState<string | null>(null);
  const [mostrarCuadroFlotante, setMostrarCuadroFlotante] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const brilloGuardado = localStorage.getItem('lector-brillo');
    const anchoGuardado = localStorage.getItem('lector-ancho');
    if (brilloGuardado) setBrillo(Number(brilloGuardado));
    if (anchoGuardado) setAnchoImagen(anchoGuardado as 'max' | 'md' | 'sm');
  }, []);

  const handleCambioBrillo = (nuevoBrillo: number) => {
    setBrillo(nuevoBrillo);
    localStorage.setItem('lector-brillo', String(nuevoBrillo));
  };

  const handleCambioAncho = (nuevoAncho: 'max' | 'md' | 'sm') => {
    setAnchoImagen(nuevoAncho);
    localStorage.setItem('lector-ancho', nuevoAncho);
  };

  useEffect(() => {
    const controlarScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setMostrarCuadroFlotante(false);
        setMostrarMenuAjustes(false);
      } else {
        setMostrarCuadroFlotante(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', controlarScroll);
    return () => window.removeEventListener('scroll', controlarScroll);
  }, []);

  useEffect(() => {
    if (!mangaId || !capId) return;
    setIsLoading(true);

    const mangaEncontrado = mangas.find(
      (m) => String(m.id).trim().toLowerCase() === String(mangaId).trim().toLowerCase()
    );

    if (mangaEncontrado) {
      setManga(mangaEncontrado);
      const listaCaps = mangaEncontrado.chapters || [];
      const indexActual = listaCaps.findIndex((c) => String(c.id).trim() === String(capId).trim());

      if (indexActual !== -1) {
        setCapituloActual(listaCaps[indexActual]);
        setPaginaActual(0);

        setIdAnterior(indexActual > 0 ? listaCaps[indexActual - 1].id : null);
        setIdSiguiente(indexActual < listaCaps.length - 1 ? listaCaps[indexActual + 1].id : null);

        const progresoRaw = localStorage.getItem('sumi_progreso') || '{}';
        try {
          const progreso = JSON.parse(progresoRaw);
          progreso[mangaId] = capId;
          localStorage.setItem('sumi_progreso', JSON.stringify(progreso));
        } catch (e) {
          console.error('Error guardando progreso:', e);
        }
      }
    }
    setIsLoading(false);
  }, [mangaId, capId]);

  const getAnchoClase = () => {
    if (anchoImagen === 'max') return 'w-full';
    if (anchoImagen === 'sm') return 'max-w-xl';
    return 'max-w-2xl';
  };

  if (isLoading || !capituloActual) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 size={24} className="animate-spin text-red-600 mb-2" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Abriendo lector...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020306] text-gray-200 flex flex-col justify-between selection:bg-red-600 selection:text-white relative">
      <div>
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-300 transform ${
          mostrarCuadroFlotante ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
        }`}>
          {mostrarMenuAjustes && (
            <div className="mb-3 bg-[#0F1422]/95 border border-gray-900 rounded-2xl p-4 w-64 backdrop-blur-md shadow-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-1">
                    <Sun size={11} className="text-amber-500" /> Cuidar Vista (Brillo)
                  </span>
                  <span>{brillo}%</span>
                </div>
                <input
                  type="range" min="30" max="100" value={brillo}
                  onChange={(e) => handleCambioBrillo(Number(e.target.value))}
                  className="w-full accent-red-600 h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {modoLectura === 'cascada' && (
                <div className="flex flex-col gap-1.5 border-t border-gray-900/60 pt-2.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Maximize2 size={10} /> Tamaño del Manhwa
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-gray-950 p-1 rounded-xl border border-gray-900">
                    {(['sm', 'md', 'max'] as const).map((size) => (
                      <button key={size} onClick={() => handleCambioAncho(size)}
                        className={`py-1 text-center rounded-lg text-[8px] font-black uppercase transition-all ${anchoImagen === size ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                        {size === 'sm' ? 'Compacto' : size === 'md' ? 'Medio' : 'Completo'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-[#0F1422]/95 border border-gray-900 rounded-full px-2.5 py-1.5 flex items-center gap-2.5 backdrop-blur-md shadow-2xl">
            <button disabled={!idAnterior} onClick={() => idAnterior && router.push(`/manhwas/${mangaId}/${idAnterior}`)}
              className={`p-2 rounded-full bg-gray-950 border border-gray-900 transition-all ${idAnterior ? 'text-gray-300 active:scale-90 md:hover:text-red-500' : 'text-gray-700 cursor-not-allowed'}`}>
              <ChevronLeft size={14} />
            </button>
            <div className="bg-gray-950 border border-gray-900/80 rounded-full px-4 py-1.5 text-center min-w-[90px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-white block">
                Cap. {capituloActual.number}
              </span>
            </div>
            <button onClick={() => setMostrarMenuAjustes(!mostrarMenuAjustes)}
              className={`p-2 rounded-full border transition-all flex items-center justify-center ${mostrarMenuAjustes ? 'bg-red-600 border-red-500 text-white rotate-45' : 'bg-gray-950 border-gray-900 text-gray-400 hover:text-white'}`}>
              <Settings size={14} />
            </button>
            <button disabled={!idSiguiente} onClick={() => idSiguiente && router.push(`/manhwas/${mangaId}/${idSiguiente}`)}
              className={`p-2 rounded-full bg-gray-950 border border-gray-900 transition-all ${idSiguiente ? 'text-gray-300 active:scale-90 md:hover:text-red-500' : 'text-gray-700 cursor-not-allowed'}`}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="pt-28 pb-6 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          <div className="w-full max-w-3xl mb-6 flex items-center justify-between bg-[#0F1422]/60 border border-gray-900 rounded-xl p-2.5 backdrop-blur-sm">
            <Link href={`/manhwas/${mangaId}`} className="text-[10px] font-black uppercase tracking-widest text-white bg-gray-950 px-3 py-2 rounded-lg flex items-center gap-1.5 border border-gray-800 transition-colors hover:bg-gray-900">
              <ArrowLeft size={12} className="text-red-500" />
              <span>Volver a la serie</span>
            </Link>
            <button onClick={() => setModoLectura(modoLectura === 'cascada' ? 'paginado' : 'cascada')}
              className="text-[10px] font-black uppercase tracking-widest bg-gray-900 border border-gray-800 text-gray-400 px-3 py-2 rounded-lg flex items-center gap-1.5">
              <Layers size={13} className="text-orange-500" />
              <span>{modoLectura === 'cascada' ? 'Cascada' : 'Paginado'}</span>
            </button>
          </div>

          <div style={{ filter: `brightness(${brillo}%)` }} className="w-full flex flex-col items-center transition-all duration-200">
            {modoLectura === 'cascada' ? (
              <div className={`w-full flex flex-col items-center bg-black/40 border border-gray-900 rounded-2xl overflow-hidden shadow-2xl ${getAnchoClase()}`}>
                {capituloActual.pages?.map((url, idx) => (
                  <img key={idx} src={url} alt={`Pág ${idx + 1}`} className="w-full h-auto block select-none" />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-4 max-w-3xl">
                <div className="w-full h-[75vh] bg-black border border-gray-900 rounded-2xl p-2 flex justify-center items-center relative shadow-2xl">
                  <img src={capituloActual.pages?.[paginaActual]} alt="Página" className="max-w-full max-h-full object-contain rounded-lg select-none" />
                  <div onClick={() => paginaActual > 0 && setPaginaActual(p => p - 1)} className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize" />
                  <div onClick={() => paginaActual < (capituloActual.pages.length - 1) && setPaginaActual(p => p + 1)} className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize" />
                </div>
                <div className="flex items-center gap-4 bg-[#0F1422] border border-gray-800 px-4 py-2 rounded-xl">
                  <span className="text-[10px] font-black tracking-widest text-gray-400">PÁG. {paginaActual + 1} / {capituloActual.pages?.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}