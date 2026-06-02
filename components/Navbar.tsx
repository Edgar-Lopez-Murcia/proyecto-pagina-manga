// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Heart, Flame, BookOpen, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  useEffect(() => {
    const savedFavs = localStorage.getItem('sumi-favs');
    if (savedFavs) {
      try {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) setFavoritesCount(parsed.length);
      } catch (e) {
        console.error('Error parsing favorites', e);
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <a href="#" className="text-xl font-black tracking-widest text-white">
          SUMI<span className="text-red-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="text-white">Inicio</a>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              Series <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-full left-0 mt-3 w-52 bg-[#0F172A] border border-gray-800 rounded-xl shadow-2xl py-2 z-20">
                  <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <BookOpen size={16} className="text-gray-400" /> Manhwas
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <BookOpen size={16} className="text-gray-400" /> Mangas
                  </a>
                  <hr className="border-gray-800 my-1.5" />
                  <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors">
                    <Flame size={16} className="text-red-500" /> Rankings
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-400">
        <button className="p-2 hover:text-white transition-colors cursor-pointer">
          <Search size={20} />
        </button>
        
        <button className="p-2 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
          <Heart size={20} className={favoritesCount > 0 ? "fill-red-500 text-red-500" : ""} />
          <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-300 font-bold">
            {favoritesCount}
          </span>
        </button>

        <button className="p-2 hover:text-white transition-colors cursor-pointer md:block hidden">
          <User size={20} />
        </button>

        <button 
          className="p-2 hover:text-white transition-colors cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B0F19] border-b border-gray-800 px-6 py-4 flex flex-col gap-4 md:hidden">
          <a href="#" className="text-white font-medium py-1">Inicio</a>
          <a href="#" className="text-gray-400 hover:text-white py-1">Manhwas</a>
          <a href="#" className="text-gray-400 hover:text-white py-1">Mangas</a>
          <a href="#" className="text-gray-400 hover:text-white py-1">Rankings</a>
        </div>
      )}
    </nav>
  );
}