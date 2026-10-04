// src/components/MangaCard.tsx
import React from 'react';
import Link from 'next/link';
import type { Manga } from '@/types';

interface MangaCardProps {
  manga: Manga;
}

export default function MangaCard({ manga }: MangaCardProps) {
  return (
    <Link
      href={`/manhwas/${manga.id}`}
      className="group flex flex-col gap-3 cursor-pointer select-none"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-800 bg-gray-950 shadow-md">
        <img
          src={manga.coverUrl}
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-white bg-[#0B0F19]/90 border border-gray-800 rounded-full uppercase">
          {manga.type}
        </span>
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 text-[11px] font-black text-yellow-400 bg-[#0B0F19]/90 border border-gray-800 rounded-lg flex items-center gap-1 shadow-sm">
          ★ {manga.rating.toFixed(1)}
        </div>
      </div>

      <div className="px-1">
        <h4 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors line-clamp-1 mb-1">
          {manga.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span className="text-red-400 group-hover:text-red-300 transition-colors">{manga.latestChapter}</span>
          <span>{manga.updatedAt}</span>
        </div>
      </div>
    </Link>
  );
}