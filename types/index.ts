export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: string[];
  createdAt: string;
}

export interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  author: string;
  status: "ongoing" | "completed" | "hiatus";
  type: "Manga" | "Manhwa" | "Manhua";
  genres: string[];
  rating: number;
  latestChapter: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}