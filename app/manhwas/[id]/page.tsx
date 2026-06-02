// src/app/manhwas/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Eye, ArrowUpDown, CheckCircle2, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface Capitulo {
  id: string;
  numero: string;
  fecha: string;
}

export default function DetalleManhwaPage() {
  const params = useParams();
  const router = useRouter();
  const idManga = params?.id as string;
  const nombreFormateado = idManga?.replace(/-/g, ' ').toUpperCase();

  // --- ESTADOS INTERACTIVOS ---
  const [esFavorito, setEsFavorito] = useState<boolean>(false);
  const [contadorFavoritos, setContadorFavoritos] = useState<number>(1420);
  const [vistasEnTiempoReal, setVistasEnTiempoReal] = useState<number>(45);
  const [ordenAscendente, setOrdenAscendente] = useState<boolean>(false); // false = Últimos primero
  const [capitulosLeidos, setCapitulosLeidos] = useState<string[]>([]);
  
  // 🆕 ESTADO NUEVO: Controla si la lista está colapsada o expandida
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);

  const [comentarios, setComentarios] = useState([
    { id: 1, usuario: 'SoloReader', texto: '¡El arte de este manhwa es de otro mundo! Totalmente recomendado.', tiempo: 'Hace 2h' },
    { id: 2, usuario: 'Animes_ADSO', texto: 'Esperando con ansias el próximo capítulo, el final del anterior me dejó frío.', tiempo: 'Hace 4h' }
  ]);
  const [nuevoComentario, setNuevoComentario] = useState<string>('');

  // Lista base expandida para que se note el efecto de recorte (Simulando 8 capítulos)
  const listaCapitulosInicial: Capitulo[] = [
    { id: '30', numero: 'Capítulo 30', fecha: 'Hace 5m' },
    { id: '29', numero: 'Capítulo 29', fecha: 'Hace 2h' },
    { id: '28', numero: 'Capítulo 28', fecha: 'Ayer' },
    { id: '27', numero: 'Capítulo 27', fecha: 'Hace 3 días' },
    { id: '26', numero: 'Capítulo 26', fecha: 'Hace 1 semana' },
    { id: '25', numero: 'Capítulo 25', fecha: 'Hace 2 semanas' },
    { id: '24', numero: 'Capítulo 24', fecha: 'Hace 3 semanas' },
    { id: '23', numero: 'Capítulo 23', fecha: 'Hace 1 mes' },
  ];

  // Simulación de tráfico en vivo
  useEffect(() => {
    const interval = setInterval(() => {
      setVistasEnTiempoReal(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cargar historial local
  useEffect(() => {
    const guardados = localStorage.getItem(`leidos-${idManga}`);
    if (guardados) setCapitulosLeidos(JSON.parse(guardados));
  }, [idManga]);

  // --- ACCIONES ---
  const ordenarCapitulos = () => {
    setOrdenAscendente(!ordenAscendente);
  };

  const alternarFavorito = () => {
    setEsFavorito(!esFavorito);
    setContadorFavoritos(prev => esFavorito ? prev - 1 : prev + 1);
  };

  const clickCapitulo = (idCap: string) => {
    let nuevasMarcas = [...capitulosLeidos];
    if (!capitulosLeidos.includes(idCap)) {
      nuevasMarcas.push(idCap);
      setCapitulosLeidos(nuevasMarcas);
      localStorage.setItem(`leidos-${idManga}`, JSON.stringify(nuevasMarcas));
    }
    router.push(`/ver/${idManga}/capitulo-${idCap}`);
  };

  const agregarComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;
    setComentarios([
      { id: Date.now(), usuario: 'Tú (ByInalik)', texto: nuevoComentario, tiempo: 'Ahora mismo' },
      ...comentarios
    ]);
    setNuevoComentario('');
  };

  // 1. Primero ordenamos la lista según la preferencia del usuario
  const capitulosOrdenados = [...listaCapitulosInicial].sort((a, b) => {
    return ordenAscendente ? parseInt(a.id) - parseInt(b.id) : parseInt(b.id) - parseInt(a.id);
  });

  // 2. 🆕 LOGICA DE RECORTE: Si 'mostrarTodos' es false, solo agarra los primeros 3 elementos. Si es true, los muestra todos.
  const capitulosVisibles = mostrarTodos ? capitulosOrdenados : capitulosOrdenados.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
      <Navbar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        
        {/* INFORMACIÓN GENERAL */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-800/60 pb-10 mb-10">
          <div className="w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shrink-0 mx-auto md:mx-0">
            <img 
              src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80" 
              alt={nombreFormateado} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-xs font-black tracking-widest text-red-500 uppercase">MANHWA COREANO</span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-none tracking-tight">{nombreFormateado || 'DETALLE DEL TÍTULO'}</h1>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {vistasEnTiempoReal} leyendo ahora
              </div>

              <button 
                onClick={alternarFavorito}
                className={`flex items-center gap-2 border px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  esFavorito ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-[#111827] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={14} className={esFavorito ? 'fill-red-500 text-red-500' : ''} />
                {contadorFavoritos} Guardados
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-black uppercase text-gray-400 tracking-wider">Sinopsis</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                En un mundo donde temibles monstruos emergen de portales destruyendo la civilización, los cazadores arriesgan sus vidas para eliminarlos. Esta es la crónica de un guerrero formidable que, tras enfrentar la desesperación absoluta, despierta un sistema único que le permite subir de nivel sin límites.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          
          {/* COLUMNA DE CAPÍTULOS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-lg font-black text-white uppercase tracking-wider">Lista de Capítulos</h2>
              
              <button 
                onClick={ordenarCapitulos}
                className="flex items-center gap-2 text-xs font-bold bg-[#111827] border border-gray-800 px-3 py-2 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUpDown size={14} />
                {ordenAscendente ? 'Primeros a Últimos' : 'Últimos a Primeros'}
              </button>
            </div>

            {/* Mapeo de capítulos visibles */}
            <div className="flex flex-col gap-2.5">
              {capitulosVisibles.map((cap) => {
                const leido = capitulosLeidos.includes(cap.id);
                return (
                  <button
                    key={cap.id}
                    onClick={() => clickCapitulo(cap.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group cursor-pointer ${
                      leido 
                        ? 'bg-[#111827]/40 border-gray-900/60 text-gray-500' 
                        : 'bg-[#111827] border-gray-800/80 text-gray-200 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {leido && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                      <span className={`text-sm font-bold ${!leido && 'group-hover:text-red-500 transition-colors'}`}>
                        {cap.numero}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{cap.fecha}</span>
                  </button>
                );
              })}
            </div>

            {/* 🆕 BOTÓN DINÁMICO DE VER MÁS / VER MENOS */}
            {listaCapitulosInicial.length > 3 && (
              <button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                className="w-full mt-2 py-3 bg-[#111827] hover:bg-[#161F30] border border-gray-800/80 text-gray-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
              >
                {mostrarTodos ? (
                  <>
                    Ver menos capítulos <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Ver más capítulos ({listaCapitulosInicial.length - 3} ocultos){' '}
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>

          {/* COLUMNA DE COMENTARIOS */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-black text-white uppercase tracking-wider border-b border-gray-800 pb-3 flex items-center gap-2">
              <MessageSquare size={18} className="text-red-500" />
              Comunidad ({comentarios.length})
            </h2>

            <form onSubmit={agregarComentario} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe un comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                className="w-full bg-[#111827] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
              />
              <button type="submit" className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors cursor-pointer">
                <Send size={16} />
              </button>
            </form>

            <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
              {comentarios.map((com) => (
                <div key={com.id} className="bg-[#111827]/60 border border-gray-800/40 p-3 rounded-xl flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] font-black">
                    <span className="text-red-400">{com.usuario}</span>
                    <span className="text-gray-600">{com.tiempo}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{com.texto}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}