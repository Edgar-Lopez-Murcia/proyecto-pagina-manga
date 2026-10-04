// src/app/manhwas/[id]/[capitulo]/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { ArrowLeft, Loader2, Layers, CornerDownRight, ChevronLeft, ChevronRight, Sun, Settings, Maximize2 } from 'lucide-react';

interface Comentario {
  id: string;
  usuario: string;
  avatar: string;
  texto: string;
  tiempo: string;
  esPropio: boolean;
  respuestas: {
    id: string;
    usuario: string;
    avatar: string;
    texto: string;
    tiempo: string;
    esPropio: boolean;
  }[];
}

export default function LectorPage() {
  const params = useParams();
  const router = useRouter();
  const mangaId = params?.id as string;
  const capId = params?.capitulo as string;

  // Estados de la Serie y carga
  const [manga, setManga] = useState<any>(null);
  const [capituloActual, setCapituloActual] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modoLectura, setModoLectura] = useState<'cascada' | 'paginado'>('cascada');
  const [paginaActual, setPaginaActual] = useState<number>(0);

  // --- CONFIGURACIÓN DE VISTA CON VALORES POR DEFECTO ---
  const [anchoImagen, setAnchoImagen] = useState<'max' | 'md' | 'sm'>('md');
  const [brillo, setBrillo] = useState<number>(100); 

  // --- CONFIGURACIÓN DEL MENÚ DESPLEGABLE DE AJUSTES ---
  const [mostrarMenuAjustes, setMostrarMenuAjustes] = useState<boolean>(false);

  // --- NAVEGACIÓN SECUENCIAL ---
  const [idAnterior, setIdAnterior] = useState<string | null>(null);
  const [idSiguiente, setIdSiguiente] = useState<string | null>(null);

  // --- CONTROL DE SCROLL (OCULTAR/MOSTRAR CUADRO) ---
  const [mostrarCuadroFlotante, setMostrarCuadroFlotante] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  // --- ESTADOS PARA LOS COMENTARIOS ---
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [textoRespuesta, setTextoRespuesta] = useState('');
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      id: '1',
      usuario: 'ByInalik',
      avatar: 'BY',
      texto: 'estuvo muy bueno jejej',
      tiempo: 'AHORA MISMO',
      esPropio: true,
      respuestas: []
    }
  ]);

  const totalComentarios = comentarios.reduce((acc, c) => acc + 1 + c.respuestas.length, 0);

  // 1. CARGAR PREFERENCIAS DE LOCALSTORAGE AL MONTAR EL COMPONENTE
  useEffect(() => {
    const brilloGuardado = localStorage.getItem('lector-brillo');
    const anchoGuardado = localStorage.getItem('lector-ancho');

    if (brilloGuardado) {
      setBrillo(Number(brilloGuardado));
    }
    if (anchoGuardado) {
      setAnchoImagen(anchoGuardado as 'max' | 'md' | 'sm');
    }
  }, []);

  // 2. GUARDAR EN LOCALSTORAGE CUANDO EL BRILLO CAMBIE
  const handleCambioBrillo = (nuevoBrillo: number) => {
    setBrillo(nuevoBrillo);
    localStorage.setItem('lector-brillo', String(nuevoBrillo));
  };

  // 3. GUARDAR EN LOCALSTORAGE CUANDO EL ANCHO CAMBIE
  const handleCambioAncho = (nuevoAncho: 'max' | 'md' | 'sm') => {
    setAnchoImagen(nuevoAncho);
    localStorage.setItem('lector-ancho', nuevoAncho);
  };

  // Lógica del Scroll para ocultar al bajar y mostrar al subir
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

  // Cargar datos del Manhwa
  useEffect(() => {
    if (!mangaId || !capId) return;
    setIsLoading(true);

    const mangaEncontrado = BASE_DATOS_MANGAS.find(
      (m) => String(m.id).trim().toLowerCase() === String(mangaId).trim().toLowerCase()
    );

    if (mangaEncontrado) {
      setManga(mangaEncontrado);
      const listaCaps = mangaEncontrado.capitulos || [];
      const indexActual = listaCaps.findIndex((c: any) => String(c.id).trim() === String(capId).trim());

      if (indexActual !== -1) {
        setCapituloActual(listaCaps[indexActual]);
        setPaginaActual(0); 

        setIdAnterior(indexActual < listaCaps.length - 1 ? listaCaps[indexActual + 1].id : null);
        setIdSiguiente(indexActual > 0 ? listaCaps[indexActual - 1].id : null);
      }
    }
    setIsLoading(false);
  }, [mangaId, capId]);

  const handleAgregarRespuesta = (comentarioId: string) => {
    if (!textoRespuesta.trim()) return;
    setComentarios(comentarios.map(c => {
      if (c.id === comentarioId) {
        return {
          ...c,
          respuestas: [...c.respuestas, {
            id: Date.now().toString(),
            usuario: 'ByInalik',
            avatar: 'BY',
            texto: textoRespuesta,
            tiempo: 'AHORA MISMO',
            esPropio: true
          }]
        };
      }
      return c;
    }));
    setTextoRespuesta('');
    setReplyingToId(null);
  };

  const getAnchoClase = () => {
    if (anchoImagen === 'max') return 'w-full';
    if (anchoImagen === 'sm') return 'max-w-xl';
    return 'max-w-2xl';
  };

  if (isLoading || !capituloActual) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 size={24} className="animate-spin text-red-600 mb-2" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Abriendo lector...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020306] text-gray-200 flex flex-col justify-between selection:bg-red-600 selection:text-white relative">
      <div>
        <Navbar />
        
        {/* ========================================================================= */}
        {/* CUADRO FLOTANTE CENTRAL CON AJUSTES DESPLEGABLES PERSISTENTES            */}
        {/* ========================================================================= */}
        <div 
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-300 transform ${
            mostrarCuadroFlotante ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
          }`}
        >
          {/* POPUP SUPERIOR DESPLEGABLE */}
          {mostrarMenuAjustes && (
            <div className="mb-3 bg-[#0F1422]/95 border border-gray-900 rounded-2xl p-4 w-64 backdrop-blur-md shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* Opción 1: Regulador de Brillo Persistente */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-gray-400">
                  <span className="flex items-center gap-1">
                    <Sun size={11} className="text-amber-500" /> Cuidar Vista (Brillo)
                  </span>
                  <span>{brillo}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={brillo}
                  onChange={(e) => handleCambioBrillo(Number(e.target.value))}
                  className="w-full accent-red-600 h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Opción 2: Cambiar Tamaño de las imágenes Persistente */}
              {modoLectura === 'cascada' && (
                <div className="flex flex-col gap-1.5 border-t border-gray-900/60 pt-2.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Maximize2 size={10} /> Tamaño del Manhwa
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-gray-950 p-1 rounded-xl border border-gray-900">
                    <button 
                      onClick={() => handleCambioAncho('sm')}
                      className={`py-1 text-center rounded-lg text-[8px] font-black uppercase transition-all ${anchoImagen === 'sm' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Compacto
                    </button>
                    <button 
                      onClick={() => handleCambioAncho('md')}
                      className={`py-1 text-center rounded-lg text-[8px] font-black uppercase transition-all ${anchoImagen === 'md' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Medio
                    </button>
                    <button 
                      onClick={() => handleCambioAncho('max')}
                      className={`py-1 text-center rounded-lg text-[8px] font-black uppercase transition-all ${anchoImagen === 'max' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      Completo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CÁPSULA CENTRAL PRINCIPAL */}
          <div className="bg-[#0F1422]/95 border border-gray-900 rounded-full px-2.5 py-1.5 flex items-center gap-2.5 backdrop-blur-md shadow-2xl">
            <button 
              disabled={!idAnterior}
              onClick={() => router.push(`/manhwas/${mangaId}/${idAnterior}`)}
              className={`p-2 rounded-full bg-gray-950 border border-gray-900 transition-all ${idAnterior ? 'text-gray-300 active:scale-90 md:hover:text-red-500' : 'text-gray-700 cursor-not-allowed'}`}
            >
              <ChevronLeft size={14} />
            </button>

            <div className="bg-gray-950 border border-gray-900/80 rounded-full px-4 py-1.5 text-center min-w-[90px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-white block">
                Cap. {capituloActual.numero}
              </span>
            </div>

            <button 
              onClick={() => setMostrarMenuAjustes(!mostrarMenuAjustes)}
              className={`p-2 rounded-full border transition-all flex items-center justify-center ${
                mostrarMenuAjustes 
                  ? 'bg-red-600 border-red-500 text-white rotate-45' 
                  : 'bg-gray-950 border-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              <Settings size={14} />
            </button>

            <button 
              disabled={!idSiguiente}
              onClick={() => router.push(`/manhwas/${mangaId}/${idSiguiente}`)}
              className={`p-2 rounded-full bg-gray-950 border border-gray-900 transition-all ${idSiguiente ? 'text-gray-300 active:scale-90 md:hover:text-red-500' : 'text-gray-700 cursor-not-allowed'}`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        {/* ========================================================================= */}

        {/* CONTENEDOR PRINCIPAL DE LAS PÁGINAS DEL MANHWA */}
        <div className="pt-28 pb-6 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          
          <div className="w-full max-w-3xl mb-6 flex items-center justify-between bg-[#0F1422]/60 border border-gray-900 rounded-xl p-2.5 backdrop-blur-sm">
            <Link href={`/manhwas/${mangaId}`} className="text-[10px] font-black uppercase tracking-widest text-white bg-gray-950 px-3 py-2 rounded-lg flex items-center gap-1.5 border border-gray-800 transition-colors hover:bg-gray-900">
              <ArrowLeft size={12} className="text-red-500" />
              <span>Volver a la serie</span>
            </Link>

            <button
              onClick={() => setModoLectura(modoLectura === 'cascada' ? 'paginado' : 'cascada')}
              className="text-[10px] font-black uppercase tracking-widest bg-gray-900 border border-gray-800 text-gray-400 px-3 py-2 rounded-lg flex items-center gap-1.5"
            >
              <Layers size={13} className="text-orange-500" />
              <span>{modoLectura === 'cascada' ? 'Cascada' : 'Paginado'}</span>
            </button>
          </div>

          <div 
            style={{ filter: `brightness(${brillo}%)` }} 
            className="w-full flex flex-col items-center transition-all duration-200"
          >
            {modoLectura === 'cascada' ? (
              <div className={`w-full flex flex-col items-center bg-black/40 border border-gray-900 rounded-2xl overflow-hidden shadow-2xl ${getAnchoClase()}`}>
                {capituloActual.paginas?.map((url: string, idx: number) => (
                  <img key={idx} src={url} alt={`Pág ${idx + 1}`} className="w-full h-auto block select-none" />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-4 max-w-3xl">
                <div className="w-full h-[75vh] bg-black border border-gray-900 rounded-2xl p-2 flex justify-center items-center relative shadow-2xl">
                  <img src={capituloActual.paginas?.[paginaActual]} alt="Página" className="max-w-full max-h-full object-contain rounded-lg select-none" />
                  <div onClick={() => paginaActual > 0 && setPaginaActual(p => p - 1)} className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize" />
                  <div onClick={() => paginaActual < (capituloActual.paginas.length - 1) && setPaginaActual(p => p + 1)} className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize" />
                </div>
                <div className="flex items-center gap-4 bg-[#0F1422] border border-gray-800 px-4 py-2 rounded-xl">
                  <span className="text-[10px] font-black tracking-widest text-gray-400">PÁG. {paginaActual + 1} / {capituloActual.paginas?.length}</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl mt-12 pt-6 border-t border-gray-950 flex items-center justify-between gap-4">
            {idAnterior ? (
              <button 
                onClick={() => router.push(`/manhwas/${mangaId}/${idAnterior}`)}
                className="bg-[#0F1422]/60 hover:bg-[#0F1422] text-xs font-black uppercase tracking-widest text-gray-300 border border-gray-900 px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <ChevronLeft size={14} className="text-red-500" />
                <span>Capítulo Anterior</span>
              </button>
            ) : (
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 border border-dashed border-gray-900 px-5 py-3 rounded-xl">Primer Capítulo</div>
            )}

            {idSiguiente ? (
              <button 
                onClick={() => router.push(`/manhwas/${mangaId}/${idSiguiente}`)}
                className="bg-red-600 hover:bg-red-500 text-xs font-black uppercase tracking-widest text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-600/10"
              >
                <span>Siguiente Capítulo</span>
                <ChevronRight size={14} />
              </button>
            ) : (
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-600 border border-dashed border-gray-900 px-5 py-3 rounded-xl">Al día con la serie</div>
            )}
          </div>

        </div>

        {/* --- SECCIÓN INTERACTIVA DE COMENTARIOS --- */}
        <div className="max-w-3xl mx-auto px-4 pb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-4 bg-red-600 rounded-full inline-block"></span>
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              COMENTARIOS DEL CAPÍTULO ({totalComentarios})
            </h2>
          </div>

          <div className="bg-[#05070B]/40 border border-gray-900 rounded-xl p-4 mb-6 flex gap-3 items-center backdrop-blur-sm">
            <textarea
              placeholder="¿Qué te pareció este episodio? Deja tu opinión..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="w-full h-12 bg-transparent text-xs text-gray-300 placeholder-gray-600 focus:outline-none resize-none font-medium pt-3"
            />
            <button 
              onClick={() => {
                if (!nuevoComentario.trim()) return;
                setComentarios([{ id: Date.now().toString(), usuario: 'ByInalik', avatar: 'BY', texto: nuevoComentario, tiempo: 'AHORA MISMO', esPropio: true, respuestas: [] }, ...comentarios]);
                setNuevoComentario('');
              }}
              className="bg-red-950/40 hover:bg-red-900/60 text-red-500 p-2.5 rounded-xl border border-red-900/30 transition-all flex items-center justify-center shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          {/* Listado de Comentarios */}
          <div className="space-y-4">
            {comentarios.map((comentario) => (
              <div key={comentario.id} className="space-y-2">
                <div className="p-4 bg-[#0F1422]/30 border border-gray-900/60 rounded-xl flex gap-4 items-start group relative transition-all hover:border-gray-800/80">
                  <div className="w-9 h-9 rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center shrink-0 shadow-lg">{comentario.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-gray-200 uppercase tracking-tight">{comentario.usuario}</span>
                      <span className="text-[8px] font-mono font-bold text-gray-600 tracking-wider uppercase">{comentario.tiempo}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium mt-1.5 leading-relaxed break-words">{comentario.texto}</p>
                    <button onClick={() => setReplyingToId(replyingToId === comentario.id ? null : comentario.id)} className="mt-3 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors">Responder</button>
                  </div>
                  <button onClick={() => setComentarios(comentarios.filter(c => c.id !== comentario.id))} className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500 transition-all p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>

                {replyingToId === comentario.id && (
                  <div className="ml-10 bg-[#0A0D16]/50 border border-gray-950 rounded-xl p-3 flex gap-2 items-center">
                    <textarea placeholder={`Responder a ${comentario.usuario}...`} value={textoRespuesta} onChange={(e) => setTextoRespuesta(e.target.value)} className="w-full h-8 bg-transparent text-xs text-gray-300 placeholder-gray-700 focus:outline-none resize-none pt-1" />
                    <button onClick={() => handleAgregarRespuesta(comentario.id)} className="bg-gray-900 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border border-gray-800">Enviar</button>
                  </div>
                )}

                {comentario.respuestas.map((resp) => (
                  <div key={resp.id} className="ml-10 flex gap-2 items-start group/reply">
                    <CornerDownRight size={14} className="text-gray-800 mt-3 shrink-0" />
                    <div className="p-3 bg-[#0F1422]/15 border border-gray-950 rounded-xl flex-1 flex gap-3 items-start relative transition-all hover:border-gray-900">
                      <div className="w-7 h-7 rounded-full bg-orange-700 text-white font-black text-[9px] flex items-center justify-center shrink-0">{resp.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-black text-gray-300 uppercase tracking-tight">{resp.usuario}</span>
                        <p className="text-xs text-gray-400 font-medium mt-1 break-words">{resp.texto}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

      </div>
      <Footer />
    </main>
  );
}