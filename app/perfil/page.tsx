// src/app/perfil/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { User, BookOpen, Heart, Calendar, ArrowRight, LogOut } from 'lucide-react';

interface ProgresoHistorial {
  [key: string]: string;
}

export default function PerfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga de sesión
  const [totalLeidos, setTotalLeidos] = useState<number>(0);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    // 1. Validar protección de ruta con LocalStorage
    const sesion = localStorage.getItem('sumi_session');
    if (!sesion) {
      router.push('/login'); // Si no hay sesión iniciada, redirige al login
      return;
    }

    // Si la sesión existe, detenemos el estado de carga
    setLoading(false);

    // 2. Cargar estadísticas reales desde el progreso de lectura
    const historialRaw = localStorage.getItem('sumi_progreso');
    if (historialRaw) {
      try {
        const historial: ProgresoHistorial = JSON.parse(historialRaw);
        setTotalLeidos(Object.keys(historial).length);
      } catch (e) {
        console.error('Error al leer historial en perfil:', e);
      }
    }

    // 3. Simulación de favoritos con los primeros datos disponibles
    if (BASE_DATOS_MANGAS.length > 0) {
      setFavoritos(BASE_DATOS_MANGAS.slice(0, 2)); 
    }
  }, [router]);

  // Función para destruir la sesión simulada
  const handleLogout = () => {
    localStorage.removeItem('sumi_session');
    router.push('/'); // Te manda al Home automáticamente
  };

  // Renderizado de seguridad mientras Next.js procesa la redirección
  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070B] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070B] text-gray-200 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* CONTENEDOR CENTRAL */}
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          
          {/* TARJETA DE PERFIL PREMIUM */}
          <div className="bg-[#0F1422]/30 border border-gray-900/80 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 p-0.5 shadow-xl shadow-red-500/10">
                  <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center">
                    <User size={32} className="text-red-400" />
                  </div>
                </div>

                {/* Info de Usuario */}
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black text-white uppercase tracking-wide">ByInalik</h2>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Lector Premium • Miembro de Sumi</p>
                  
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900/40 border border-gray-900/60 px-3 py-1 rounded-xl">
                      <Calendar size={13} className="text-red-500/70" />
                      <span>Unido en 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Cerrar Sesión */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/5"
              >
                <LogOut size={13} />
                Cerrar Sesión
              </button>
            </div>

            {/* CONTADORES DE ESTADÍSTICAS */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-900/60 mt-8 pt-6">
              <div className="text-center p-4 bg-[#05070B]/40 border border-gray-900/40 rounded-xl">
                <span className="block text-xl font-black text-white font-mono">{totalLeidos}</span>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center justify-center gap-1.5 mt-1">
                  <BookOpen size={12} className="text-red-500" /> Leyendo
                </span>
              </div>
              <div className="text-center p-4 bg-[#05070B]/40 border border-gray-900/40 rounded-xl">
                <span className="block text-xl font-black text-white font-mono">{favoritos.length}</span>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center justify-center gap-1.5 mt-1">
                  <Heart size={12} className="text-orange-500 fill-orange-500/10" /> Favoritos
                </span>
              </div>
            </div>
          </div>

          {/* SECCIÓN DE FAVORITOS */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-1 h-3 bg-red-500 rounded-full" />
              Mis Manhwas Favoritos
            </h3>

            {favoritos.length === 0 ? (
              <p className="text-xs text-gray-600 font-medium bg-[#0F1422]/10 border border-gray-900/40 p-4 rounded-xl text-center">
                Aún no has marcado ningún manhwa como favorito.
              </p>
            ) : (
              <div className="grid gap-3">
                {favoritos.map((manga) => {
                  const titulo = manga.titulo || manga.title || 'Sin título';
                  const imagen = manga.imagen || manga.cover || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80';
                  
                  return (
                    <Link
                      key={manga.id}
                      href={`/manhwas/${manga.id}`}
                      className="group bg-[#0F1422]/20 border border-gray-900/40 hover:border-gray-800 rounded-xl p-3 flex items-center justify-between transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-12 aspect-[3/4] rounded-lg overflow-hidden bg-[#05070B] shrink-0">
                          <img src={imagen} alt={titulo} className="w-full h-full object-cover" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-black text-white uppercase tracking-wide truncate group-hover:text-red-400 transition-colors">
                            {titulo}
                          </h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                            {manga.capitulos?.length || manga.chapters?.length || 0} Capítulos disponibles
                          </p>
                        </div>
                      </div>

                      <div className="p-2 bg-gray-900/30 text-gray-500 group-hover:text-white group-hover:bg-red-500 rounded-lg transition-all ml-4 shrink-0">
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}