// src/app/ver/[id]/[capitulo]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowLeft, Sliders, Moon, Eye, Send } from 'lucide-react';

interface ComentarioCapitulo {
  id: string;
  usuario: string;
  texto: string;
  fecha: string;
}

export default function LectorCapituloPage() {
  const params = useParams();
  const router = useRouter();
  
  const idManga = params?.id as string;
  const capituloId = params?.capitulo as string;

  const contenedorLecturaRef = useRef<HTMLDivElement>(null);

  // --- ESTADOS DE CONTROL DE INTERFAZ ---
  const [anchoImagen, setAnchoImagen] = useState<number>(700);
  const [brilloNocturno, setBrilloNocturno] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progresoLectura, setProgresoLectura] = useState<number>(0);
  const [mostrarControles, setMostrarControles] = useState<boolean>(true);
  const [mostrarAjustes, setMostrarAjustes] = useState<boolean>(false);

  // --- SISTEMA INTERACTIVO DE COMENTARIOS ---
  const [comentarios, setComentarios] = useState<ComentarioCapitulo[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState<string>('');

  const ultimaPosicionScroll = useRef<number>(0);

  // 1. OBTENER Y MAPEAR EL MANHWA Y SUS CAPÍTULOS DE MANERA FLEXIBLE
  const mangaRaw = BASE_DATOS_MANGAS.find((m) => m.id === idManga) as any;
  
  const manga = mangaRaw ? {
    titulo: mangaRaw.titulo || mangaRaw.title || 'Sin título',
    // Intentar leer desde 'capitulos' o 'chapters' indistintamente
    capitulos: (mangaRaw.capitulos || mangaRaw.chapters || []) as any[]
  } : null;

  // Extraer e indexar numéricamente todos los IDs disponibles de los capítulos
  // Esto previene fallos si los IDs vienen como strings ("1", "2") o números (1, 2)
  const listaCapitulosNumericos = manga
    ? manga.capitulos
        .map((c) => parseInt(c.id?.toString() || c.number?.toString() || '0', 10))
        .filter((num) => !isNaN(num) && num > 0)
        // Los ordenamos de menor a mayor para calcular correctamente el orden de navegación
        .sort((a, b) => a - b)
    : [];

  const capituloActualNum = parseInt(capituloId, 10);

  // Encontrar la posición del capítulo actual dentro de la lista real existente
  const indiceActual = listaCapitulosNumericos.indexOf(capituloActualNum);

  // Determinar si hay un capítulo antes o después en la lista
  const tieneCapAnterior = indiceActual > 0;
  const tieneCapSiguiente = indiceActual !== -1 && indiceActual < listaCapitulosNumericos.length - 1;

  const capAnteriorId = tieneCapAnterior ? listaCapitulosNumericos[indiceActual - 1] : null;
  const capSiguienteId = tieneCapSiguiente ? listaCapitulosNumericos[indiceActual + 1] : null;

  // Métodos de navegación
  const irAlCapituloAnterior = () => {
    if (tieneCapAnterior && capAnteriorId !== null) {
      router.push(`/ver/${idManga}/${capAnteriorId}`);
    }
  };

  const irAlCapituloSiguiente = () => {
    if (tieneCapSiguiente && capSiguienteId !== null) {
      router.push(`/ver/${idManga}/${capSiguienteId}`);
    }
  };

  // --- EVENTO DETECTOR DEL TECLADO (FLECHAS IZQ / DER) ---
  useEffect(() => {
    const manejarTeclado = (evento: KeyboardEvent) => {
      // Evitar que cambie de capítulo si el usuario está escribiendo en el textarea de comentarios
      if (document.activeElement?.tagName === 'TEXTAREA' || document.activeElement?.tagName === 'INPUT') {
        return;
      }

      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        if (tieneCapAnterior && capAnteriorId !== null) {
          router.push(`/ver/${idManga}/${capAnteriorId}`);
        }
      } else if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        if (tieneCapSiguiente && capSiguienteId !== null) {
          router.push(`/ver/${idManga}/${capSiguienteId}`);
        }
      }
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [tieneCapAnterior, tieneCapSiguiente, capAnteriorId, capSiguienteId, idManga]);


  // Imágenes de simulación para las páginas
  const paginasFalsas = [
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=800&q=80',
    'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80'
  ];

  // Persistencia, historial y scroll
  useEffect(() => {
    if (!idManga || !capituloId) return;

    const historial = localStorage.getItem('sumi_progreso');
    const progresoActual = historial ? JSON.parse(historial) : {};
    progresoActual[idManga] = capituloId;
    localStorage.setItem('sumi_progreso', JSON.stringify(progresoActual));

    const comentariosGuardados = localStorage.getItem(`comentarios-${idManga}-${capituloId}`);
    if (comentariosGuardados) {
      setComentarios(JSON.parse(comentariosGuardados));
    } else {
      setComentarios([
        { id: 'c1', usuario: 'ReaderPro', texto: `¡No puedo creer el final de este capítulo ${capituloId}! Se viene tremenda batalla.`, fecha: 'Hace 40 min' },
        { id: 'c2', usuario: 'SumiFan', texto: 'El estilo de dibujo en esta escena en cascada es sencillamente espectacular.', fecha: 'Hace 2 horas' }
      ]);
    }

    setProgresoLectura(0);

    const manejarScroll = () => {
      const scrollActual = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      
      if (alturaTotal > 0) {
        const porcentaje = (scrollActual / alturaTotal) * 100;
        setProgresoLectura(porcentaje);
      }

      if (scrollActual > ultimaPosicionScroll.current && scrollActual > 150) {
        setMostrarControles(false);
        setMostrarAjustes(false);
      } else {
        setMostrarControles(true);
      }
      ultimaPosicionScroll.current = scrollActual;
    };

    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, [idManga, capituloId]);

  // Pantalla completa
  useEffect(() => {
    const cambioFullscreen = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', cambioFullscreen);
    return () => document.removeEventListener('fullscreenchange', cambioFullscreen);
  }, []);

  const controlarFullscreen = async () => {
    if (!contenedorLecturaRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await contenedorLecturaRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const enviarComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const nuevo: ComentarioCapitulo = {
      id: Date.now().toString(),
      usuario: 'ByInalik (Tú)',
      texto: nuevoComentario.trim(),
      fecha: 'Ahora mismo'
    };

    const listaActualizada = [nuevo, ...comentarios];
    setComentarios(listaActualizada);
    setNuevoComentario('');
    localStorage.setItem(`comentarios-${idManga}-${capituloId}`, JSON.stringify(listaActualizada));
  };

  const cambiarCapituloSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const destino = e.target.value;
    if (destino) {
      router.push(`/ver/${idManga}/${destino}`);
    }
  };

  if (!manga) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
        <Navbar />
        <div className="py-32 text-center max-w-md mx-auto">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Manga no encontrado</h2>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070B] text-gray-200 flex flex-col justify-between relative select-none selection:bg-red-500/20 selection:text-red-400">
      
      <div 
        className="fixed top-0 left-0 h-1 bg-red-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${progresoLectura}%` }}
      />

      <div>
        {!isFullscreen && <Navbar />}

        <div 
          ref={contenedorLecturaRef} 
          className={`w-full flex flex-col items-center relative ${isFullscreen ? 'bg-[#05070B] pt-6' : 'pt-24'}`}
        >
          <div className="fixed inset-0 bg-black pointer-events-none z-40" style={{ opacity: brilloNocturno / 100 }} />

          {/* Encabezado rápido */}
          <div className="w-full max-w-3xl px-4 mb-6 flex items-center justify-between z-10">
            <Link 
              href={`/manhwas/${idManga}`}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Volver al índice
            </Link>
            <div className="text-right">
              <h2 className="text-xs font-black text-white uppercase tracking-wider">{manga.titulo}</h2>
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-0.5">Capítulo {capituloId}</p>
            </div>
          </div>

          {/* CASCADA DE IMÁGENES */}
          <div className="flex flex-col items-center w-full px-2" style={{ maxWidth: `${anchoImagen}px` }}>
            {paginasFalsas.map((url, index) => (
              <div key={index} className="w-full border-b border-black/10 bg-[#0F1422]/10 relative aspect-[2/3]">
                <img src={url} alt={`Página ${index + 1}`} className="w-full h-full object-cover shadow-2xl" loading="lazy" />
                <span className="absolute bottom-3 right-3 text-[9px] font-mono font-black tracking-widest text-white/30 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  {index + 1} / {paginasFalsas.length}
                </span>
              </div>
            ))}
          </div>

          {/* BOTONES INTERMEDIOS DE FIN DE CAPÍTULO */}
          <div className="mt-16 mb-8 flex flex-col items-center gap-4 z-10">
            <div className="w-12 h-1 bg-red-500/20 rounded-full" />
            <p className="text-xs text-gray-400 font-black uppercase tracking-widest bg-red-500/5 px-4 py-2 border border-red-500/10 rounded-xl">
              ¡Gracias por leer! Teclado activado: usa ← y →
            </p>
            
            <div className="flex gap-3 mt-2">
              <button
                onClick={irAlCapituloAnterior}
                disabled={!tieneCapAnterior}
                className="px-5 py-2.5 bg-[#0F1422] hover:bg-[#141B2D] border border-gray-900 text-gray-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-10 disabled:pointer-events-none cursor-pointer"
              >
                Cap. Anterior
              </button>
              <button
                onClick={irAlCapituloSiguiente}
                disabled={!tieneCapSiguiente}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-20 disabled:pointer-events-none shadow-lg shadow-red-500/10 cursor-pointer"
              >
                Siguiente Capítulo
              </button>
            </div>
          </div>

          {/* SECCIÓN DE COMENTARIOS */}
          <div className="w-full max-w-2xl px-4 pt-10 pb-24 border-t border-gray-900/60 mt-8 z-10">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-red-500 rounded-full" />
              Comentarios del Capítulo ({comentarios.length})
            </h3>

            <form onSubmit={enviarComentario} className="mb-8">
              <div className="relative bg-[#0F1422]/60 border border-gray-900 rounded-xl focus-within:border-gray-800 p-2 flex items-end gap-2">
                <textarea
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder="¿Qué te pareció este episodio? Deja tu opinión..."
                  rows={2}
                  className="w-full bg-transparent text-xs text-gray-200 placeholder-gray-600 outline-none resize-none p-2 font-medium"
                />
                <button
                  type="submit"
                  disabled={!nuevoComentario.trim()}
                  className="p-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-20 text-white rounded-lg transition-all cursor-pointer shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-3.5">
              {comentarios.map((com) => (
                <div key={com.id} className="p-4 bg-[#0F1422]/20 border border-gray-900/40 rounded-xl flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 uppercase tracking-wider">
                    {com.usuario.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-black text-white">{com.usuario}</span>
                      <span className="text-[9px] text-gray-600 font-bold tracking-wide uppercase">{com.fecha}</span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{com.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {!isFullscreen && <Footer />}

      {/* 🛠️ BARRA DE HERRAMIENTAS INFERIOR (REPRESENTACIÓN FIEL A Captura de pantalla 2026-06-05 184944.png) */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl transition-all duration-300 transform ${
        mostrarControles ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}>
        
        {/* PANEL SECUNDARIO SLIDERS */}
        {mostrarAjustes && (
          <div className="mb-3 p-4 bg-[#0B0F19]/95 border border-gray-900 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-gray-400">
                <span className="flex items-center gap-1"><Sliders size={12} /> Ancho del Lector</span>
                <span className="text-white font-mono">{anchoImagen}px</span>
              </div>
              <input type="range" min="450" max="1100" value={anchoImagen} onChange={(e) => setAnchoImagen(Number(e.target.value))} className="w-full accent-red-500 h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-gray-400">
                <span className="flex items-center gap-1"><Moon size={12} /> Filtro Nocturno</span>
                <span className="text-white font-mono">{brilloNocturno}%</span>
              </div>
              <input type="range" min="0" max="65" value={brilloNocturno} onChange={(e) => setBrilloNocturno(Number(e.target.value))} className="w-full accent-red-500 h-1 bg-gray-900 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        )}

        {/* BARRA PRINCIPAL */}
        <div className="w-full bg-[#0B0F19]/90 border border-gray-900/80 rounded-2xl backdrop-blur-xl p-3 shadow-2xl flex items-center justify-between gap-4">
          
          {/* Flecha Izquierda */}
          <button
            onClick={irAlCapituloAnterior}
            disabled={!tieneCapAnterior}
            className="p-2.5 bg-[#0F1422] hover:bg-[#141B2D] border border-gray-900 text-gray-500 hover:text-white rounded-xl transition-all disabled:opacity-10 disabled:pointer-events-none cursor-pointer"
            title="Capítulo Anterior (o usa ←)"
          >
            <ChevronLeft size={16} />
          </button>

          {/* CONTENEDOR CENTRAL: SELECTOR DINÁMICO ESTILIZADO */}
          <div className="flex-1 max-w-xs relative group">
            <select
              value={capituloActualNum.toString()}
              onChange={cambiarCapituloSelect}
              className="w-full bg-[#0F1422] text-xs font-black uppercase text-center tracking-widest text-gray-300 border border-red-500/20 hover:border-red-500/40 rounded-xl pl-4 pr-10 py-2.5 outline-none appearance-none cursor-pointer transition-colors text-center-last"
            >
              {/* Si la lista vino vacía por alguna razón, renderizar al menos el actual */}
              {listaCapitulosNumericos.length === 0 ? (
                <option value={capituloId}>Capítulo {capituloId}</option>
              ) : (
                listaCapitulosNumericos.map((num) => (
                  <option key={num} value={num.toString()} className="bg-[#0B0F19] text-gray-300">
                    Capítulo {num}
                  </option>
                ))
              )}
            </select>
            
            {/* Icono del ojo a la derecha exacto al de la captura */}
            <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-500 group-hover:text-red-400 transition-colors">
              <Eye size={14} />
            </div>
          </div>

          {/* BOTONES ACCESORIOS */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMostrarAjustes(!mostrarAjustes)}
              className={`p-2.5 border rounded-xl transition-all cursor-pointer ${
                mostrarAjustes ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-[#0F1422] border-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              <Sliders size={16} />
            </button>

            <button
              onClick={controlarFullscreen}
              className="p-2.5 bg-[#0F1422] hover:bg-[#141B2D] border border-gray-900 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          {/* Flecha Derecha */}
          <button
            onClick={irAlCapituloSiguiente}
            disabled={!tieneCapSiguiente}
            className="p-2.5 bg-[#0F1422] hover:bg-[#141B2D] border border-gray-900 text-gray-500 hover:text-white rounded-xl transition-all disabled:opacity-10 disabled:pointer-events-none cursor-pointer"
            title="Siguiente Capítulo (o usa →)"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      </div>

    </main>
  );
}