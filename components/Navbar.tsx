'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mangas } from '@/data/mangas';
import { Search, Heart, Menu, X } from 'lucide-react';

// Distancia de Levenshtein para búsqueda con tolerancia a errores
function obtenerDistanciaLevenshtein(a: string, b: string): number {
  const matriz = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matriz[i][0] = i;
  for (let j = 0; j <= b.length; j++) matriz[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      matriz[i][j] = Math.min(
        matriz[i - 1][j] + 1,
        matriz[i][j - 1] + 1,
        matriz[i - 1][j - 1] + costo
      );
    }
  }
  return matriz[a.length][b.length];
}

function buscarConTolerancia(termino: string, texto: string): boolean {
  const t = termino.toLowerCase();
  const x = texto.toLowerCase();
  if (x.includes(t)) return true;
  const distancia = obtenerDistanciaLevenshtein(t, x);
  return distancia <= Math.max(1, Math.floor(t.length / 3));
}

export default function Navbar() {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState<string>('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);
  const [contadorFavoritos, setContadorFavoritos] = useState<number>(0);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState<boolean>(false);

  const contenedorBusquedaRef = useRef<HTMLDivElement>(null);

  // Cargar contador de favoritos
  useEffect(() => {
    const actualizarContador = () => {
      const favs = localStorage.getItem('sumi-favoritos');
      if (favs) {
        try {
          const lista = JSON.parse(favs);
          setContadorFavoritos(Array.isArray(lista) ? lista.length : 0);
        } catch {
          setContadorFavoritos(0);
        }
      } else {
        setContadorFavoritos(0);
      }
    };
    actualizarContador();
    window.addEventListener('favoritosActualizados', actualizarContador);
    return () => window.removeEventListener('favoritosActualizados', actualizarContador);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function manejarClickAfuera(e: MouseEvent) {
      if (contenedorBusquedaRef.current && !contenedorBusquedaRef.current.contains(e.target as Node)) {
        setMostrarDropdown(false);
      }
    }
    document.addEventListener('mousedown', manejarClickAfuera);
    return () => document.removeEventListener('mousedown', manejarClickAfuera);
  }, []);

  // Buscar mangas
  useEffect(() => {
    if (busqueda.trim().length < 2) {
      setResultados([]);
      setMostrarDropdown(false);
      return;
    }
    const filtrados = mangas.filter(
      (m) =>
        buscarConTolerancia(busqueda, m.title) ||
        buscarConTolerancia(busqueda, m.description)
    );
    setResultados(filtrados.slice(0, 5));
    setMostrarDropdown(true);
  }, [busqueda]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link href="/" className="text-xl font-black text-white tracking-widest flex items-center gap-2 shrink-0">
          <span className="text-red-500">S</span>UMI
        </Link>

        {/* BARRA DE BÚSQUEDA */}
        <div ref={contenedorBusquedaRef} className="hidden sm:block flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onFocus={() => busqueda.length >= 2 && setMostrarDropdown(true)}
            placeholder="Buscar mangas, manhwas..."
            className="w-full bg-[#05070B] border border-gray-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-gray-200 placeholder-gray-500 outline-none transition-all"
          />
          {mostrarDropdown && resultados.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-[#0F1422] border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
              {resultados.map((manga) => (
                <button
                  key={manga.id}
                  onClick={() => {
                    router.push(`/manhwas/${manga.id}`);
                    setBusqueda('');
                    setMostrarDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-[#161D30] transition-colors text-left"
                >
                  <img src={manga.coverUrl} alt={manga.title} className="w-10 h-14 object-cover rounded" />
                  <div>
                    <p className="text-xs font-black text-white">{manga.title}</p>
                    <p className="text-[10px] text-gray-500">{manga.type} • {manga.latestChapter}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NAVEGACIÓN DERECHA */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link>
          <Link href="/series" className="text-gray-400 hover:text-white transition-colors">Series</Link>

          <Link href="/favoritos" className="relative p-2 text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center">
            <Heart size={18} />
            {contadorFavoritos > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {contadorFavoritos}
              </span>
            )}
          </Link>

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
          className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {menuMovilAbierto && (
        <div className="sm:hidden bg-[#0B0F19] border-b border-gray-900/80 px-4 pt-2 pb-6 flex flex-col gap-4 text-xs font-black uppercase tracking-wider">
          <Link href="/" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors pt-2">Inicio</Link>
          <Link href="/series" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors">Series</Link>
          <Link href="/favoritos" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors">
            Favoritos ({contadorFavoritos})
          </Link>
          <Link href="/login" onClick={() => setMenuMovilAbierto(false)} className="text-red-500 hover:text-red-400 transition-colors pt-2 border-t border-gray-900">
            Ingresar al sistema
          </Link>
        </div>
      )}
    </nav>
  );
}