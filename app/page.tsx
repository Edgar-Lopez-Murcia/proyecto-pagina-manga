// src/app/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import MangaCard from '@/components/MangaCard';
import Footer from '@/components/Footer';
import { Manga } from '@/types';
import { Info } from 'lucide-react';

export default function Home() {
  // 📋 Datos estructurados exactamente con las propiedades en inglés que lee tu MangaCard
  const nuevosLanzamientos: Manga[] = [
    { 
      id: '1', 
      title: 'Solo Leveling Ragnarok', 
      coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.9, 
      chaptersCount: 30, 
      latestChapter: 'Cap 29', 
      updatedAt: 'Hace 5m' 
    },
    { 
      id: '2', 
      title: 'Omniscient Reader Viewpoint', 
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.8, 
      chaptersCount: 120, 
      latestChapter: 'Cap 119', 
      updatedAt: 'Hace 1h' 
    },
    { 
      id: '3', 
      title: 'The Beginning After The End', 
      coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.7, 
      chaptersCount: 160, 
      latestChapter: 'Cap 159', 
      updatedAt: 'Hace 2h' 
    },
    { 
      id: '4', 
      title: 'Tower of God', 
      coverUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=300&q=80', 
      type: 'Manhwa', 
      rating: 4.5, 
      chaptersCount: 600, 
      latestChapter: 'Cap 598', 
      updatedAt: 'Ayer' 
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] pb-20 selection:bg-red-500/30 selection:text-red-300 flex flex-col justify-between">
      <div>
        {/* 1. Barra de Navegación Fija */}
        <Navbar />

        {/* 2. Slider Principal (Ubicado fuera del contenedor para ocupar todo el ancho) */}
        <div className="pt-20">
          <HeroSlider />
        </div>

        {/* CONTENEDOR CON RESTRICCIÓN DE ANCHO PARA EL RESTO DE LA INTERFAZ */}
        <div className="px-6 max-w-7xl mx-auto mt-12 w-full">
          
          {/* 3. Banner Informativo de Fase Beta */}
          <div className="bg-[#111827] border border-gray-900 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-500 border border-red-500/20 shrink-0">
                <Info size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-0.5">Sumi está en fase Beta</h3>
                <p className="text-sm text-gray-400">
                  Esta plataforma está siendo construida en conjunto. Tus favoritos se guardarán localmente para evitar pérdidas de datos preliminares.
                </p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white text-[#0B0F19] hover:bg-gray-200 text-sm font-black rounded-xl transition-all shadow-md shrink-0 cursor-pointer">
              Reportar Error
            </button>
          </div>

          {/* 4. Sección: Grid de Nuevos Lanzamientos */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Nuevos Lanzamientos</h2>
                <p className="text-xs text-gray-500 mt-1">Los capítulos más recientes subidos a la plataforma</p>
              </div>
              <button className="text-xs md:text-sm font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                Ver Todos →
              </button>
            </div>

            {/* Cuadrícula Responsive para las Tarjetas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {nuevosLanzamientos.map((manga) => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 5. Pie de Página Global */}
      <Footer />
    </main>
  );
}