// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BASE_DATOS_MANGAS } from '@/data/mangas';
import { Search, Heart, Menu, X } from 'lucide-react';

// 🧮 Función auxiliar: Calcula la distancia de Levenshtein entre dos palabras
function obtenerDistanciaLevenshtein(a: string, b: string): number {
  const matriz: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matriz[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matriz[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matriz[i][j] = matriz[i - 1][j - 1];
      } else {
        matriz[i][j] = Math.min(
          matriz[i - 1][j - 1] + 1, // Sustitución
          matriz[i][j - 1] + 1,     // Inserción
          matriz[i - 1][j] + 1      // Eliminación
        );
      }
    }
  }
  return matriz[b.length][a.length];
}

// 🕵️‍♂️ Función de Búsqueda Difusa (Fuzzy Search)
function buscarConTolerancia(terminoBuscado: string, listaMangas: any[]): any[] {
  const termino = terminoBuscado.toLowerCase().trim();
  if (!termino) return [];

  // Dividimos la búsqueda del usuario en palabras individuales
  const palabrasBusqueda = termino.split(/\s+/);

  const puntuados = listaMangas.map((manga) => {
    const titulo = (manga.titulo || manga.title || '').toLowerCase();
    const palabrasTitulo = titulo.split(/\s+/);
    
    // 1. Prioridad Máxima: Si contiene la frase exacta o empieza igual
    if (titulo.includes(termino)) {
      return { manga, coincidencia: true, score: 0 };
    }

    // 2. Comprobación por aproximación de Levenshtein palabra por palabra
    let scoreTotal = 0;
    let palabrasEncontradas = 0;

    for (const pBusqueda of palabrasBusqueda) {
      if (pBusqueda.length < 2) continue; // Ignorar letras sueltas

      let mejorDistanciaPalabra = 999;

      for (const pTitulo of palabrasTitulo) {
        // Ignorar artículos cortos en el título para mejorar la precisión
        if (pTitulo.length < 2) continue; 

        const distancia = obtenerDistanciaLevenshtein(pBusqueda, pTitulo);
        if (distancia < mejorDistanciaPalabra) {
          mejorDistanciaPalabra = distancia;
        }
      }

      // Definimos el umbral de tolerancia según el largo de la palabra escritas por el usuario
      const limiteTolerancia = pBusqueda.length <= 4 ? 1 : 2; 

      if (mejorDistanciaPalabra <= limiteTolerancia) {
        scoreTotal += mejorDistanciaPalabra;
        palabrasEncontradas++;
      }
    }

    // Si la mayoría de las palabras coinciden por aproximación, es válido
    const esValido = palabrasEncontradas >= Math.ceil(palabrasBusqueda.length * 0.6);

    return { 
      manga, 
      coincidencia: esValido, 
      score: scoreTotal + (palabrasBusqueda.length - palabrasEncontradas) * 3 
    };
  });

  // Filtramos los que pasaron el filtro y los ordenamos (menor score = mejor coincidencia)
  return puntuados
    .filter(item => item.coincidencia)
    .sort((a, b) => a.score - b.score)
    .map(item => item.manga);
}

export default function Navbar() {
  const router = useRouter();
  
  const [busqueda, setBusqueda] = useState<string>('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState<boolean>(false);
  const [contadorFavoritos, setContadorFavoritos] = useState<number>(0);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState<boolean>(false);
  
  const contenedorBusquedaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function manejarClickAfuera(evento: MouseEvent) {
      if (contenedorBusquedaRef.current && !contenedorBusquedaRef.current.contains(evento.target as Node)) {
        setMostrarDropdown(false);
      }
    }
    document.addEventListener('mousedown', manejarClickAfuera);
    return () => document.removeEventListener('mousedown', manejarClickAfuera);
  }, []);

  const actualizarContadorFavoritos = () => {
    const favoritos = localStorage.getItem('sumi-favoritos');
    if (favoritos) {
      const listaIds = JSON.parse(favoritos);
      setContadorFavoritos(listaIds.length);
    } else {
      setContadorFavoritos(0);
    }
  };

  useEffect(() => {
    actualizarContadorFavoritos();
    window.addEventListener('favoritosActualizados', actualizarContadorFavoritos);
    return () => window.removeEventListener('favoritosActualizados', actualizarContadorFavoritos);
  }, []);

  // Manejar el cambio en el input aplicando la búsqueda difusa inteligente
  const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim().length > 0) {
      const filtrados = buscarConTolerancia(valor, BASE_DATOS_MANGAS);
      setResultados(filtrados);
      setMostrarDropdown(true);
    } else {
      setResultados([]);
      setMostrarDropdown(false);
    }
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resultados.length > 0) {
      setMostrarDropdown(false);
      setBusqueda('');
      router.push(`/manhwas/${resultados[0].id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-900/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-black text-white tracking-widest flex items-center gap-2 shrink-0">
          <span className="text-red-500">S</span>UMI
        </Link>

        {/* 🔍 BARRA DE BÚSQUEDA INTERACTIVA CON INTELIGENCIA ANTI-TYPOS */}
        <div ref={contenedorBusquedaRef} className="hidden sm:block flex-1 max-w-md relative">
          <form onSubmit={manejarSubmit} className="relative w-full h-10 bg-[#0F1422]/60 border border-gray-900 rounded-xl focus-within:border-gray-800 transition-all flex items-center px-3">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={busqueda}
              onChange={manejarBusqueda}
              onFocus={() => busqueda.trim().length > 0 && setMostrarDropdown(true)}
              placeholder="Buscar manhwa (tolera errores)..."
              className="w-full h-full bg-transparent outline-none border-none text-xs text-gray-200 placeholder-gray-600 px-2.5 font-medium"
            />
          </form>

          {/* DROPDOWN DE RESULTADOS */}
          {mostrarDropdown && (
            <div className="absolute top-12 left-0 right-0 bg-[#0F1422] border border-gray-900 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-64 overflow-y-auto divide-y divide-gray-900/40">
              {resultados.length > 0 ? (
                resultados.map((manga: any) => (
                  <Link
                    key={manga.id}
                    href={`/manhwas/${manga.id}`}
                    onClick={() => {
                      setMostrarDropdown(false);
                      setBusqueda('');
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-[#161D30]/50 transition-colors group"
                  >
                    <img
                      src={manga.imagen || manga.coverUrl || manga.imagenUrl || ''}
                      alt={manga.titulo || manga.title}
                      className="w-8 h-11 object-cover rounded-md bg-[#0B0F19]"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-gray-300 group-hover:text-white truncate">
                        {manga.titulo || manga.title}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                        {manga.autor || manga.author || 'Manga'}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-[11px] text-gray-500 font-medium">
                  No se encontraron resultados para "{busqueda}"
                </div>
              )}
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {contadorFavoritos}
              </span>
            )}
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
          <div className="relative w-full h-10 bg-[#0F1422]/60 border border-gray-900 rounded-xl flex items-center px-3">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input
              type="text"
              value={busqueda}
              onChange={manejarBusqueda}
              placeholder="Buscar manhwa..."
              className="w-full h-full bg-transparent outline-none border-none text-xs text-gray-200 placeholder-gray-600 px-2.5 font-medium"
            />
          </div>
          
          {busqueda.trim().length > 0 && (
            <div className="bg-[#0F1422] border border-gray-900 rounded-xl overflow-hidden max-h-40 overflow-y-auto divide-y divide-gray-900/40">
              {resultados.map((manga: any) => (
                <Link
                  key={manga.id}
                  href={`/manhwas/${manga.id}`}
                  onClick={() => {
                    setMenuMovilAbierto(false);
                    setBusqueda('');
                  }}
                  className="flex items-center gap-3 p-2.5"
                >
                  <p className="text-xs font-bold text-gray-300 truncate">{manga.titulo || manga.title}</p>
                </Link>
              ))}
            </div>
          )}

          <Link href="/" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors pt-2">Inicio</Link>
          <Link href="/series" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors">Series</Link>
          <Link href="/favoritos" onClick={() => setMenuMovilAbierto(false)} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            Favoritos <span className="text-red-400">({contadorFavoritos})</span>
          </Link>
        </div>
      )}
    </nav>
  );
}