// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sesionValida } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import ContinuarLeyendo from '@/components/ContinuarLeyendo';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { BookOpen, Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [sesionVerificada, setSesionVerificada] = useState(false);

  useEffect(() => {
    const tieneSesion = sesionValida();

    if (!tieneSesion) {
    router.push('/auth/landing');
    } else {
    setSesionVerificada(true);
    }
  }, [router]);

  // Mostrar loading mientras se valida sesión
  if (!sesionVerificada) {
    return (
      <div className="min-h-screen bg-[#05070B] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-red-600" />
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-[#05070B] text-gray-200 flex flex-col justify-between">
      <div>
        <Navbar />
        <HeroSlider />
        
        {/* Sección de progreso de lectura (Carátulas compactas) */}
        <ContinuarLeyendo />

        {/* 🌟 NUEVA SECCIÓN: EXPLORAR TODO EL CATÁLOGO */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-16 pt-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-1 h-3.5 bg-red-500 rounded-full" />
            Catálogo de Manhwas
          </h3>

          {/* Grid Principal con las proporciones estándar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BASE_DATOS_MANGAS.map((manga: any) => {
              const titulo = manga.titulo || manga.title || 'Sin título';
              const imagen = manga.imagen || manga.cover || manga.img || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80';
              const generos = manga.generos || manga.genres || [];

              return (
                <Link
                  key={manga.id}
                  href={`/manhwas/${manga.id}`}
                  className="group bg-[#0F1422]/20 border border-gray-900/60 rounded-xl overflow-hidden hover:border-gray-800 hover:bg-[#0F1422]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Contenedor de la Imagen */}
                    <div className="aspect-[3/4] w-full relative overflow-hidden bg-[#05070B]">
                      <img
                        src={imagen}
                        alt={titulo}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-50" />
                    </div>

                    {/* Contenido de la Tarjeta */}
                    <div className="p-3">
                      {/* Lista de géneros pequeños */}
                      {generos.length > 0 && (
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider truncate mb-1">
                          {generos.join(' • ')}
                        </p>
                      )}
                      <h4 className="text-xs font-black text-white uppercase tracking-wide line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {titulo}
                      </h4>
                    </div>
                  </div>

                  {/* Detalle inferior */}
                  <div className="px-3 pb-3 pt-1 flex items-center justify-between border-t border-gray-900/40 mt-2">
                    <span className="text-[9px] font-mono font-black tracking-widest text-gray-600 uppercase bg-gray-900/30 px-1.5 py-0.5 rounded">
                      MANHWA
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                      <BookOpen size={11} className="text-red-500/70" />
                      {manga.capitulos?.length || manga.chapters?.length || 0} Caps
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}