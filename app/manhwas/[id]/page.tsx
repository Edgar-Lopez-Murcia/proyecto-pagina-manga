// src/app/manhwas/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Star, BookOpen, Heart, Eye, ChevronDown, ChevronUp, Send } from 'lucide-react';

interface Comentario {
  id: string;
  usuario: string;
  texto: string;
  fecha: string;
}

export default function DetalleManhwaPage() {
  const params = useParams();
  const idManga = params?.id as string;

  // Estados esenciales de interfaz
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
  const [esFavorito, setEsFavorito] = useState<boolean>(false);
  
  // Registra el último capítulo guardado en el historial de lectura
  const [ultimoCapituloLeido, setUltimoCapituloLeido] = useState<string | null>(null);
  
  // Estado para el sistema interactivo de comentarios
  const [comentarios, setComentarios] = useState<Comentario[]>([
    { id: '1', usuario: 'SoloReader', texto: '¡Este manhwa es una absoluta obra de arte! El diseño de los paneles mejora en cada capítulo.', fecha: 'Hace 2 horas' },
    { id: '2', usuario: 'ShadowDev', texto: 'Por fin adaptaron esta novela, el ritmo del inicio está perfecto.', fecha: 'Ayer' }
  ]);
  const [nuevoComentario, setNuevoComentario] = useState<string>('');

  // 1. Buscamos el manhwa en la base de datos simulada
  const mangaRaw = BASE_DATOS_MANGAS.find((m) => m.id === idManga) as any;

  // 2. Mapeo seguro de datos con fallbacks para evitar errores si faltan campos
  const manga = mangaRaw ? {
    id: mangaRaw.id,
    titulo: mangaRaw.titulo || mangaRaw.title || 'Sin título',
    autor: mangaRaw.autor || mangaRaw.author || 'Desconocido',
    sinopsis: mangaRaw.sinopsis || mangaRaw.description || mangaRaw.synopsis || 'No hay sinopsis disponible actualmente para esta serie.',
    imagen: mangaRaw.imagen || mangaRaw.coverUrl || mangaRaw.imagenUrl || '',
    calificacion: mangaRaw.calificacion || mangaRaw.rating || 4.5,
    tipo: mangaRaw.tipo || mangaRaw.type || 'Manhwa',
    capitulos: mangaRaw.capitulos || mangaRaw.chapters || [
      { id: '1', titulo: 'Prólogo de la serie', fecha: 'Hace 3 días' },
      { id: '2', titulo: 'El despertar del poder', fecha: 'Hace 2 días' },
      { id: '3', titulo: 'Primera misión en solitario', fecha: 'Hace 1 día' },
      { id: '4', titulo: 'El gremio de las sombras', fecha: 'Hace 5 horas' },
      { id: '5', titulo: 'Invasión a la mazmorra (Último)', fecha: 'Hace 5 min' }
    ]
  } : null;

  // 3. Cargar persistencia desde el LocalStorage al montar el componente
  useEffect(() => {
    if (!idManga) return;

    // Verificar favoritos
    const favoritos = localStorage.getItem('sumi-favoritos');
    if (favoritos) {
      const listaIds = JSON.parse(favoritos);
      setEsFavorito(listaIds.includes(idManga));
    }

    // Recuperar el punto exacto de continuación de lectura
    const historial = localStorage.getItem('sumi_progreso');
    if (historial) {
      const progreso = JSON.parse(historial);
      if (progreso[idManga]) {
        setUltimoCapituloLeido(progreso[idManga].toString());
      }
    }
  }, [idManga]);

  // 4. Alternar el estado de favoritos
  const controlarFavorito = () => {
    const favoritos = localStorage.getItem('sumi-favoritos');
    let listaIds = favoritos ? JSON.parse(favoritos) : [];

    if (listaIds.includes(idManga)) {
      listaIds = listaIds.filter((id: string) => id !== idManga);
      setEsFavorito(false);
    } else {
      listaIds.push(idManga);
      setEsFavorito(true);
    }

    localStorage.setItem('sumi-favoritos', JSON.stringify(listaIds));
    window.dispatchEvent(new Event('favoritosActualizados'));
  };

  // 5. Agregar un nuevo comentario a la lista
  const enviarComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const comentarioCreado: Comentario = {
      id: Date.now().toString(),
      usuario: 'ByInalik (Tú)',
      texto: nuevoComentario.trim(),
      fecha: 'Ahora mismo'
    };

    setComentarios([comentarioCreado, ...comentarios]);
    setNuevoComentario('');
  };

  if (!manga) {
    return (
      <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between">
        <Navbar />
        <div className="py-32 text-center max-w-md mx-auto">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Serie no encontrada</h2>
          <p className="text-xs text-gray-500 mt-2">El identificador de este manhwa no existe en nuestros registros actuales.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Configuración del paginador de capítulos ("Ver Más")
  const capitulosVisibles = mostrarTodos ? manga.capitulos : manga.capitulos.slice(0, 5);

  // Destino del botón principal de lectura (Historial o Capítulo 1)
  const primerCapituloId = manga.capitulos[0]?.id?.toString() || '1';
  const destinoLecturaId = ultimoCapituloLeido || primerCapituloId;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-gray-200 flex flex-col justify-between selection:bg-red-500/20 selection:text-red-400">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          
          {/* SECCIÓN SUPERIOR: HERO DETALLES */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-gray-900 pb-12">
            <div className="w-56 h-80 bg-[#0F1422] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shrink-0 relative">
              {manga.imagen && (
                <img 
                  src={manga.imagen} 
                  alt={manga.titulo} 
                  className="w-full h-full object-cover select-none"
                />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-md">
                {manga.tipo}
              </span>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-wider mt-3 leading-tight">
                {manga.titulo}
              </h1>
              
              <p className="text-xs text-gray-500 font-bold mt-1.5 italic">
                Por: <span className="text-gray-400 not-italic">{manga.autor}</span>
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900/60 px-3 py-1.5 rounded-xl text-xs font-bold text-yellow-500">
                  <Star size={14} className="fill-yellow-500" />
                  {manga.calificacion}
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900/60 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-400">
                  <BookOpen size={14} />
                  {manga.capitulos.length} Capítulos
                </div>
                <div className="flex items-center gap-1.5 bg-[#0F1422] border border-gray-900/60 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-400">
                  <Heart size={14} className="text-red-500 fill-red-500" />
                  {esFavorito ? '1' : '0'} Favoritos
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md">
                {/* BOTÓN PRINCIPAL DINÁMICO */}
                <Link
                  href={`/ver/${manga.id}/${destinoLecturaId}`}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-500/10 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 3l14 9-14 9V3z"/>
                  </svg>
                  {ultimoCapituloLeido ? (
                    <span>Continuar cap. {ultimoCapituloLeido}</span>
                  ) : (
                    <span>Empezar a leer</span>
                  )}
                </Link>

                <button
                  onClick={controlarFavorito}
                  className={`flex-1 py-3 font-black text-xs uppercase tracking-widest rounded-xl transition-all border text-center flex items-center justify-center gap-2 cursor-pointer ${
                    esFavorito
                      ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-transparent hover:border-gray-800 hover:text-gray-400'
                      : 'bg-transparent border-gray-800 text-gray-400 hover:border-red-500/50 hover:text-white'
                  }`}
                >
                  <Heart size={14} className={esFavorito ? "fill-red-400" : ""} />
                  {esFavorito ? 'Guardado' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>

          {/* SECCIÓN CONTENIDO INFERIOR */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            <div className="lg:col-span-2 flex flex-col gap-12">
              
              {/* Sinopsis */}
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-red-500 rounded-full" />
                  Sinopsis
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                  {manga.sinopsis}
                </p>
              </div>

              {/* LISTA DE CAPÍTULOS CON OJITO ROJO DINÁMICO */}
              <div>
                <h2 className="text-xs font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-red-500 rounded-full" />
                  Lista de Capítulos ({manga.capitulos.length})
                </h2>

                <div className="flex flex-col gap-2.5">
                  {capitulosVisibles.map((cap: any) => {
                    const idCapituloLimpio = (cap.id || '').toString();
                    
                    // Condición: El capítulo es marcado como leído si su número es menor o igual al último guardado
                    const esLeido = ultimoCapituloLeido 
                      ? parseInt(idCapituloLimpio) <= parseInt(ultimoCapituloLeido)
                      : false;
                    
                    return (
                      <div 
                        key={cap.id}
                        className="group flex items-center justify-between p-3.5 bg-[#0F1422]/40 hover:bg-[#0F1422]/90 border border-gray-900/60 hover:border-gray-800 rounded-xl transition-all"
                      >
                        <Link 
                          href={`/ver/${manga.id}/${idCapituloLimpio}`}
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          {/* El contenedor cambia a borde y fondo rojo si está leído */}
                          <div className={`p-2 rounded-lg transition-colors ${
                            esLeido 
                              ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                              : 'bg-gray-800/40 text-gray-500 group-hover:text-white group-hover:bg-red-500/10'
                          }`}>
                            <Eye 
                              size={14} 
                              className={esLeido ? "text-red-500 fill-red-500/10" : "group-hover:text-red-400"} 
                            />
                          </div>
                          <div>
                            <span className={`text-xs font-bold transition-colors ${
                              esLeido ? 'text-red-400 font-black' : 'text-gray-300 group-hover:text-white'
                            }`}>
                              Capítulo {cap.id} {esLeido && <span className="text-[10px] ml-1.5 opacity-60 text-red-500 font-medium">(Leído)</span>}
                            </span>
                            {cap.titulo && (
                              <p className="text-[10px] text-gray-500 font-medium mt-0.5 group-hover:text-gray-400">
                                {cap.titulo}
                              </p>
                            )}
                          </div>
                        </Link>
                        <span className="text-[10px] text-gray-500 font-medium shrink-0">
                          {cap.fecha || 'Reciente'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Botón Ver Más */}
                {manga.capitulos.length > 5 && (
                  <button
                    onClick={() => setMostrarTodos(!mostrarTodos)}
                    className="w-full mt-4 py-2.5 bg-[#0F1422]/20 border border-gray-900 hover:border-gray-800 rounded-xl text-xs font-black uppercase text-gray-400 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {mostrarTodos ? (
                      <>Ver Menos <ChevronUp size={14} /></>
                    ) : (
                      <>Ver Más ({manga.capitulos.length - 5} más) <ChevronDown size={14} /></>
                    )}
                  </button>
                )}
              </div>

              {/* Sección de Comentarios */}
              <div className="border-t border-gray-900/60 pt-10">
                <h2 className="text-xs font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-red-500 rounded-full" />
                  Comentarios ({comentarios.length})
                </h2>

                <form onSubmit={enviarComentario} className="mb-8">
                  <div className="relative bg-[#0F1422]/60 border border-gray-900 rounded-xl focus-within:border-gray-800 transition-all p-2 flex items-end gap-2">
                    <textarea
                      value={nuevoComentario}
                      onChange={(e) => setNuevoComentario(e.target.value)}
                      placeholder="Escribe tu opinión sobre este manhwa..."
                      rows={3}
                      className="w-full bg-transparent text-xs text-gray-200 placeholder-gray-600 outline-none resize-none p-2 font-medium"
                    />
                    <button
                      type="submit"
                      disabled={!nuevoComentario.trim()}
                      className="p-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-20 disabled:hover:bg-red-500 text-white rounded-lg transition-all cursor-pointer shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </form>

                <div className="flex flex-col gap-4">
                  {comentarios.map((com) => (
                    <div key={com.id} className="p-4 bg-[#0F1422]/20 border border-gray-900/40 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 uppercase tracking-wider">
                        {com.usuario.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-black text-white">{com.usuario}</span>
                          <span className="text-[9px] text-gray-600 font-bold tracking-wide uppercase">{com.fecha}</span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                          {com.texto}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            <div className="hidden lg:block">
              {/* Lateral libre */}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}