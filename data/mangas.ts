// src/data/mangas.ts
import { Manga } from '@/types';

export const BASE_DATOS_MANGAS: Manga[] = [
  { 
    id: 'solo-leveling-ragnarok', 
    title: 'Solo Leveling: Ragnarok', 
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', 
    type: 'Manhwa', 
    rating: 4.9, 
    chaptersCount: 30, 
    latestChapter: 'Cap. 30', 
    updatedAt: 'Hace 5m' 
  },
  { 
    id: 'omniscient-reader-viewpoint', 
    title: 'Omniscient Reader Viewpoint', 
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', 
    type: 'Manhwa', 
    rating: 4.8, 
    chaptersCount: 120, 
    latestChapter: 'Cap. 119', 
    updatedAt: 'Hace 1h' 
  },
  { 
    id: 'the-beginning-after-the-end', 
    title: 'The Beginning After The End', 
    coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80', 
    type: 'Manhwa', 
    rating: 4.7, 
    chaptersCount: 160, 
    latestChapter: 'Cap. 159', 
    updatedAt: 'Hace 2h' 
  },
  { 
    id: 'tower-of-god', 
    title: 'Tower of God', 
    coverUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&q=80', 
    type: 'Manhwa', 
    rating: 4.5, 
    chaptersCount: 600, 
    latestChapter: 'Cap. 598', 
    updatedAt: 'Ayer' 
  },
];

// Diccionario extra con las sinopsis reales para la vista de detalle
export const SINOPSIS_MANGAS: Record<string, string> = {
  'solo-leveling-ragnarok': 'La tierra vuelve a estar en peligro cuando fragmentos del poder del Monarca de las Sombras despiertan en su hijo. ¡Comienza una nueva era de mazmorras y subidas de nivel ilimitadas!',
  'omniscient-reader-viewpoint': 'Dokja era un oficinista común cuyo único pasatiempo era leer su novela web favorita. De repente, el mundo real se transforma exactamente en el caótico escenario apocalíptico de esa novela.',
  'the-beginning-after-the-end': 'El Rey Grey tiene una fuerza, riqueza y prestigio incomparables en un mundo gobernado por la habilidad marcial. Sin embargo, renace en un nuevo mundo lleno de magia y monstruos como un bebé.',
  'tower-of-god': '¿Qué deseas? ¿Dinero, gloria, poder o venganza? Todo lo que deseas se encuentra en la cima de la Torre. Sigue la historia de Bam, un joven que entra a la torre buscando a su única amiga.',
};