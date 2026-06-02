// src/types/index.ts

export interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  type: 'Manhwa' | 'Manga' | 'Novela';
  rating: number;
  chaptersCount: number;
  latestChapter: string;
  updatedAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  accentColor: string;
}