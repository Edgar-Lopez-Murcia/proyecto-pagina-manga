// src/components/Footer.tsx
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0F19] border-t border-gray-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* SECCIÓN IZQUIERDA: LOGO Y SLOGAN */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" className="text-xl font-black tracking-widest text-white hover:opacity-90 transition-opacity">
            SUMI<span className="text-red-500">.</span>
          </a>
          <p className="text-xs text-gray-500 font-medium text-center md:text-left">
            Tu plataforma definitiva para la lectura de Mangas y Manhwas.
          </p>
        </div>

        {/* SECCIÓN CENTRAL: ENLACES RÁPIDOS */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Contacto</a>
          <a href="#" className="hover:text-white transition-colors text-red-500/90 font-bold">DMCA</a>
        </div>

        {/* SECCIÓN DERECHA: CRÉDITOS Y AÑO */}
        <div className="text-center md:text-right flex flex-col gap-1">
          <p className="text-xs text-gray-500 font-semibold">
            &copy; {currentYear} Sumi. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-gray-600 font-medium">
            Hecho con ⚔️ por el equipo ADSO.
          </p>
        </div>

      </div>
    </footer>
  );
}