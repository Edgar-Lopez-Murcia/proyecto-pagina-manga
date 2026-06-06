// src/data/mangas.ts

// 1. DEFINICIÓN DE INTERFACES (Contratos de datos de Sumi)
export interface Capitulo {
  id: string;       // ID único (ej: "1", "2")
  numero: number;   // Número del capítulo para cálculos y ordenamiento
  titulo: string;   // Nombre del capítulo
  paginas: string[]; // Lista ordenada de URLs de las imágenes en cascada
}

export interface Manga {
  id: string;          // ID slug para las URLs (ej: "solo-leveling")
  titulo: string;      // Título comercial del manhwa
  sinopsis: string;    // Resumen de la trama
  imagen: string;      // URL de la carátula principal (relación 3:4)
  banner: string;      // URL para el Hero Slider de la página principal
  generos: string[];   // Etiquetas de categorías
  estado: 'Emisión' | 'Finalizado';
  capitulos: Capitulo[]; // Listado de episodios asociados
}

// 2. BASE DE DATOS SIMULADA (Mock Data con tipado estricto)
export const BASE_DATOS_MANGAS: Manga[] = [
  {
    id: "solo-leveling",
    titulo: "Solo Leveling",
    sinopsis: "En un mundo donde cazadores humanos deben luchar contra monstruos para evitar la aniquilación de la raza humana, Sung Jin-Woo, el cazador más débil de todos, se encuentra en una lucha desesperada por la supervivencia en una mazmorra doble de alto rango.",
    imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80",
    generos: ["Acción", "Fantasía", "Sistema"],
    estado: "Finalizado",
    capitulos: [
      {
        id: "1",
        numero: 1,
        titulo: "El cazador más débil de la humanidad",
        paginas: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
          "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
          "https://images.unsplash.com/photo-1618005198143-e528346436f1?w=800&q=80"
        ]
      },
      {
        id: "2",
        numero: 2,
        titulo: "La Mazmorra Doble",
        paginas: [
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80",
          "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&q=80"
        ]
      }
    ]
  },
  {
    id: "eleceed",
    titulo: "Eleceed",
    sinopsis: "Jiwoo es un joven de buen corazón que posee los reflejos ultrarrápidos de un gato y oculta en secreto sus poderes. Todo cambia cuando se encuentra con Kayden, un agente encubierto prófugo atrapado dentro del cuerpo de un gato gordo.",
    imagen: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    generos: ["Acción", "Comedia", "Superpoderes"],
    estado: "Emisión",
    capitulos: [
      {
        id: "1",
        numero: 1,
        titulo: "Un gato muy extraño",
        paginas: [
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
          "https://images.unsplash.com/photo-1618005158179-023f9ec3672e?w=800&q=80"
        ]
      }
    ]
  }
];