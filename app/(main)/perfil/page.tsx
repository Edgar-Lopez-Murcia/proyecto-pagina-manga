'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mangas } from '@/data/mangas';
import type { Manga } from '@/types';
import { User, BookOpen, Heart, Calendar, ArrowRight, LogOut, Edit2, Check, X, Camera } from 'lucide-react';

export default function PerfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalLeidos, setTotalLeidos] = useState<number>(0);
  const [favoritos, setFavoritos] = useState<Manga[]>([]);
  const [nombreUsuario, setNombreUsuario] = useState<string>('ByInalik');
  const [avatarCustom, setAvatarCustom] = useState<string | null>(null);
  const [editandoNombre, setEditandoNombre] = useState<boolean>(false);
  const [nuevoNombre, setNuevoNombre] = useState<string>('');

  useEffect(() => {
    const sesionRaw = localStorage.getItem('sumi_session');
    if (!sesionRaw) {
      router.push('/login');
      return;
    }
    try {
      const sesion = JSON.parse(sesionRaw);
      if (sesion.name) setNombreUsuario(sesion.name);
      if (sesion.avatarCustom) setAvatarCustom(sesion.avatarCustom);
    } catch (e) {
      console.error('Error al cargar la sesión inicial:', e);
    }
    setLoading(false);

    const historialRaw = localStorage.getItem('sumi_progreso');
    if (historialRaw) {
      try {
        const historial = JSON.parse(historialRaw);
        setTotalLeidos(Object.keys(historial).length);
      } catch (e) { console.error(e); }
    }

    const favsRaw = localStorage.getItem('sumi-favoritos') || '[]';
    try {
      const listaIdsFavoritos: string[] = JSON.parse(favsRaw);
      setFavoritos(mangas.filter((m) => listaIdsFavoritos.includes(m.id)));
    } catch (e) { console.error(e); }
  }, [router]);

  const guardarNombre = () => {
    if (nuevoNombre.trim().length === 0) return;
    setNombreUsuario(nuevoNombre);
    setEditandoNombre(false);
    const sesionRaw = localStorage.getItem('sumi_session');
    if (sesionRaw) {
      try {
        const sesion = JSON.parse(sesionRaw);
        sesion.name = nuevoNombre;
        localStorage.setItem('sumi_session', JSON.stringify(sesion));
      } catch (e) { console.error(e); }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      alert('La imagen es muy pesada. Elige una menor a 1.5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAvatarCustom(base64String);
      const sesionRaw = localStorage.getItem('sumi_session');
      if (sesionRaw) {
        try {
          const sesion = JSON.parse(sesionRaw);
          sesion.avatarCustom = base64String;
          localStorage.setItem('sumi_session', JSON.stringify(sesion));
        } catch (e) { console.error(e); }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('sumi_session');
    router.push('/');
  };

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
        <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          <div className="bg-[#0F1422]/30 border border-gray-900/80 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 p-0.5 shadow-xl shadow-red-500/10 overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full bg-[#0B0F19] rounded-full overflow-hidden flex items-center justify-center">
                      {avatarCustom ? (
                        <img src={avatarCustom} alt="Avatar" className="w-full h-full object-cover select-none pointer-events-none" />
                      ) : (
                        <User size={32} className="text-white/40" />
                      )}
                    </div>
                  </div>
                  <label htmlFor="upload-avatar"
                    className="absolute -bottom-1 -right-1 p-2 bg-gray-900 hover:bg-red-600 border border-gray-800 text-gray-400 hover:text-white rounded-full transition-all cursor-pointer shadow-lg z-10">
                    <Camera size={12} />
                  </label>
                  <input type="file" id="upload-avatar" accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>

                <div className="text-center sm:text-left flex-1 w-full">
                  {editandoNombre ? (
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                      <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)}
                        className="bg-[#05070B] border border-gray-800 focus:border-red-500 text-sm font-black text-white rounded-lg px-3 py-1.5 outline-none tracking-wide uppercase max-w-[200px]"
                        placeholder="Nuevo Nombre" maxLength={15} autoFocus />
                      <button onClick={guardarNombre} className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                        <Check size={14} />
                      </button>
                      <button onClick={() => setEditandoNombre(false)} className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 group">
                      <h2 className="text-lg font-black text-white uppercase tracking-wide">{nombreUsuario}</h2>
                      <button onClick={() => { setNuevoNombre(nombreUsuario); setEditandoNombre(true); }}
                        className="p-1 bg-gray-900/20 text-gray-500 hover:text-red-400 rounded transition-all cursor-pointer">
                        <Edit2 size={12} />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Lector Premium • Miembro de Sumi</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-900/40 border border-gray-900/60 px-3 py-1 rounded-xl">
                      <Calendar size={13} className="text-red-500/70" />
                      <span>Unido en 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0">
                <LogOut size={13} />
                Cerrar Sesión
              </button>
            </div>

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
                  <Heart size={12} className="text-orange-500" /> Favoritos
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-1 h-3 bg-red-500 rounded-full" />
              Mis Manhwas Favoritos
            </h3>

            {favoritos.length === 0 ? (
              <div className="text-center py-8 bg-[#0F1422]/10 border border-gray-900/40 rounded-xl px-4">
                <p className="text-xs text-gray-600 font-medium">Aún no has marcado ningún manhwa como favorito.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {favoritos.map((manga) => (
                  <Link key={manga.id} href={`/manhwas/${manga.id}`}
                    className="group bg-[#0F1422]/20 border border-gray-900/40 hover:border-gray-800 rounded-xl p-3 flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 aspect-[3/4] rounded-lg overflow-hidden bg-[#05070B] shrink-0">
                        <img src={manga.coverUrl} alt={manga.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-black text-white uppercase tracking-wide truncate group-hover:text-red-400 transition-colors">
                          {manga.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                          {manga.chapters?.length || 0} Capítulos disponibles
                        </p>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-900/30 text-gray-500 group-hover:text-white group-hover:bg-red-500 rounded-lg transition-all ml-4 shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}