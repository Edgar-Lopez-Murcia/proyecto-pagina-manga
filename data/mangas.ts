// src/data/mangas.ts

export interface Capitulo {
  id: string;
  numero: string;
  paginas: string[];
}

export interface Manga {
  id: string;
  titulo: string;
  sinopsis: string;
  imagen: string;
  estado: 'Emisión' | 'Finalizado';
  generos: string[];
  capitulos: Capitulo[];
}

export const BASE_DATOS_MANGAS: Manga[] = [
  {
    id: "solo-leveling-ragnarok",
    titulo: "Solo Leveling: Ragnarok",
    sinopsis: "La secuela oficial del legendario manhwa Solo Leveling. El mundo vuelve a estar en peligro y un nuevo legado despierta entre las sombras.",
    imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=500&auto=format&fit=crop", 
    estado: "Emisión",
    generos: ["Acción", "Fantasía", "Aventura"],
    capitulos: [
      {
        id: "1",
        numero: "1",
        paginas: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop"
        ]
      },
      {
        id: "2",
        numero: "2",
        paginas: [
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "the-beginning-after-the-end",
    titulo: "The Beginning After The End",
    sinopsis: "El Rey Grey tiene una fuerza, riqueza y prestigio incomparables en un mundo gobernado por la habilidad marcial. Sin embargo, la soledad permanece de cerca.",
    imagen: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop",
    estado: "Emisión",
    generos: ["Fantasía", "Isekai", "Acción"],
    capitulos: [
      {
        id: "1",
        numero: "1",
        paginas: [
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
        ]
      }
    ]
  }
];