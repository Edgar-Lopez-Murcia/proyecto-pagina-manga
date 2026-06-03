// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Heart, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  // Estado para la cantidad de favoritos en tiempo real
  const [cantidadFavoritos, setCantidadFavoritos] = useState<number>(0);
  
  // Estado para controlar si el menú desplegable de "Series" está abierto
  const [menuSeriesAbierto, setMenuSeriesAbierto] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Escuchamos el localStorage para actualizar el globo numérico dinámicamente
  useEffect(() => {
    const actualizarContador = () => {
      const favoritosGuardados = localStorage.getItem('sumi-favoritos');
      if (favoritosGuardados) {
        const lista = JSON.parse(favoritosGuardados);
        setCantidadFavoritos(lista.length);
      } else {
        setCantidadFavoritos(0);
      }
    };

    actualizarContador();

    window.addEventListener('storage', actualizarContador);
    window.addEventListener('favoritosActualizados', actualizarContador);

    return () => {
      window.removeEventListener('storage', actualizarContador);
      window.removeEventListener('favoritosActualizados', actualizarContador);
    };
  }, []);

  // Cerrar el menú desplegable si el usuario da clic afuera de él
  useEffect(() => {
    const clickAfuera = (evento: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(evento.target as Node)) {
        setMenuSeriesAbierto(false);
      }
    };
    document.addEventListener('mousedown', clickAfuera);
    return () => document.removeEventListener('mousedown', clickAfuera);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-900/50 px-6 flex items-center justify-between z-50">
      
      {/* IZQUIERDA: LOGO Y MENÚS */}
      <div className="flex items-center gap-10">
        <Link href="/" className="text-2xl font-black text-white tracking-widest flex items-center gap-1 select-none">
          SUMI<span className="text-red-500">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-400 relative">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          
          {/* CONTENEDOR DEL MENÚ DESPLEGABLE DE SERIES */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuSeriesAbierto(!menuSeriesAbierto)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold focus:outline-none"
            >
              Series <ChevronDown size={14} className={`transition-transform duration-200 ${menuSeriesAbierto ? 'rotate-180 text-red-500' : ''}`} />
            </button>

            {/* MENÚ FLOTANTE CON ICONOS SVG */}
            {menuSeriesAbierto && (
              <div className="absolute left-0 mt-3 w-52 bg-[#0F1422] border border-gray-900 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                
                <Link 
                  href="/manhwas" 
                  onClick={() => setMenuSeriesAbierto(false)}
                  className="px-3 py-2.5 hover:bg-gray-800/50 rounded-lg text-xs font-black uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-2.5"
                >
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.886H3.873l5.017 3.644L6.978 18.4 12 14.756l5.022 3.644-1.912-5.87 5.017-3.644h-6.215z"/>
                  </svg>
                  Ver Todo el Catálogo
                </Link>

                <div className="h-[1px] bg-gray-900 my-1" />

                <Link 
                  href="/manhwas?genero=accion" 
                  onClick={() => setMenuSeriesAbierto(false)}
                  className="px-3 py-2 hover:bg-gray-800/30 rounded-lg text-xs text-gray-400 hover:text-gray-200 transition-all flex items-center gap-2.5 font-bold"
                >
                  <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 17.5 3 6V3h3l11.5 11.5"/>
                    <path d="m13 19 6-6"/>
                    <path d="M19 19h.01"/>
                    <path d="M19 13h.01"/>
                    <path d="M14 19h.01"/>
                  </svg>
                  Acción
                </Link>

                <Link 
                  href="/manhwas?genero=isekai" 
                  onClick={() => setMenuSeriesAbierto(false)}
                  className="px-3 py-2 hover:bg-gray-800/30 rounded-lg text-xs text-gray-400 hover:text-gray-200 transition-all flex items-center gap-2.5 font-bold"
                >
                  <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12z"/>
                    <path d="M12 12A10 10 0 1 0 2 12h10z"/>
                    <path d="M12 12a10 10 0 1 0 10-10V12z"/>
                  </svg>
                  Isekai / Sistema
                </Link>

                <Link 
                  href="/manhwas?genero=romance" 
                  onClick={() => setMenuSeriesAbierto(false)}
                  className="px-3 py-2 hover:bg-gray-800/30 rounded-lg text-xs text-gray-400 hover:text-gray-200 transition-all flex items-center gap-2.5 font-bold"
                >
                  <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  Romance
                </Link>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* DERECHA: ICONOS DE ACCIÓN */}
      <div className="flex items-center gap-4 text-gray-400">
        <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Buscar">
          <Search size={20} />
        </button>

        {/* CORAZÓN DE BIBLIOTECA DINÁMICO */}
        <Link 
          href="/biblioteca" 
          className="p-2 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 relative"
          title="Mi Biblioteca"
        >
          <Heart 
            size={20} 
            className={`transition-colors ${cantidadFavoritos > 0 ? "text-red-500 fill-red-500" : ""}`} 
          />
          
          <span className="text-[11px] font-black bg-blue-600 text-white min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center border border-[#0B0F19]">
            {cantidadFavoritos}
          </span>
        </Link>

        <button className="p-2 hover:text-white transition-colors cursor-pointer" title="Mi Perfil">
          <User size={20} />
        </button>
      </div>

    </nav>
  );
}