import type { Manga } from "@/types";

export const mangas: Manga[] = [
  {
    id: "solo-leveling-ragnarok",
    title: "Solo Leveling: Ragnarok",
    coverUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=500&auto=format&fit=crop",
    description: "La secuela oficial del legendario manhwa Solo Leveling. El mundo vuelve a estar en peligro y un nuevo legado despierta entre las sombras.",
    author: "Chugong",
    status: "ongoing",
    type: "Manhwa",
    genres: ["Acción", "Fantasía", "Aventura"],
    rating: 4.9,
    latestChapter: "Cap. 29",
    updatedAt: "Hace 2 días",
    chapters: [
      {
        id: "1",
        number: 1,
        title: "El despertar",
        pages: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: "2026-01-15",
      },
      {
        id: "2",
        number: 2,
        title: "La sombra renace",
        pages: [
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: "2026-01-22",
      },
    ],
  },
  {
    id: "the-beginning-after-the-end",
    title: "The Beginning After The End",
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop",
    description: "El Rey Grey tiene una fuerza, riqueza y prestigio incomparables en un mundo gobernado por la habilidad marcial. Sin embargo, la soledad permanece de cerca.",
    author: "TurtleMe",
    status: "ongoing",
    type: "Manhwa",
    genres: ["Fantasía", "Isekai", "Acción"],
    rating: 4.8,
    latestChapter: "Cap. 180",
    updatedAt: "Hace 5 días",
    chapters: [
      {
        id: "1",
        number: 1,
        title: "El rey",
        pages: [
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        ],
        createdAt: "2026-01-10",
      },
    ],
  },
  // Añade más mangas aquí siguiendo el mismo formato
];