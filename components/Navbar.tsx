// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Search, Heart, Menu, X, User } from 'lucide-react'; // Añadí User como opción

// ... (Las funciones obtenerDistanciaLevenshtein y buscarConTolerancia se mantienen iguales)

export default function Navbar() {
  const router = useRouter();
  
  const [busqueda, setBusqueda] = useState<string>('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);
  const [contadorFavoritos, setContadorFavoritos] = useState<number>(0);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState<boolean>(false);
  
  const contenedorBusquedaRef = useRef<HTMLDivElement>(null);

  // ... (Tus useEffect de favoritos y click afuera se mantienen iguales)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-black text-white tracking-widest flex items-center gap-2 shrink-0">
          <span className="text-red-500">S</span>UMI
        </Link>

        {/* BARRA DE BÚSQUEDA */}
        <div ref={contenedorBusquedaRef} className="hidden sm:block flex-1 max-w-md relative">
          {/* ... (Tu código de formulario de búsqueda se mantiene igual) */}
        </div>

        {/* NAVEGACIÓN DERECHA */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link>
          <Link href="/series" className="text-gray-400 hover:text-white transition-colors">Series</Link>
          
          <Link href="/favoritos" className="relative p-2 text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center">
            <Heart size={18} />
            {contadorFavoritos > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {contadorFavoritos}
              </span>
            )}
          </Link>

          {/* NUEVO BOTÓN DE INGRESO */}
          <Link 
            href="/login" 
            className="text-[9px] font-black uppercase tracking-widest text-white border border-gray-800 bg-gray-950 px-5 py-2 rounded-full hover:bg-gray-900 transition-all active:scale-95"
          >
            Ingresar
          </Link>
        </div>

        {/* BOTÓN MÓVIL */}
        <button 
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {menuMovilAbierto && (
        <div className="sm:hidden bg-[#0B0F19] border-b border-gray-900/80 px-4 pt-2 pb-6 flex flex-col gap-4 text-xs font-black uppercase tracking-wider">
          {/* ... (Tu código de buscador móvil se mantiene igual) */}
          
          <Link href="/" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors pt-2">Inicio</Link>
          <Link href="/series" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors">Series</Link>
          <Link href="/favoritos" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors">
            Favoritos ({contadorFavoritos})
          </Link>
          
          {/* NUEVO ENLACE DE INGRESO EN MÓVIL */}
          <Link 
            href="/login" 
            onClick={() => setMenuMovilAbierto(false)} 
            className="text-red-500 hover:text-red-400 transition-colors pt-2 border-t border-gray-900"
          >
            Ingresar al sistema
          </Link>
        </div>
      )}
    </nav>
  );
}