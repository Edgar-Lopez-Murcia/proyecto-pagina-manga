// src/app/(main)/page.tsx
import HeroSlider from '@/components/HeroSlider';
import MangaCard from '@/components/MangaCard';
import ContinuarLeyendo from '@/components/ContinuarLeyendo';
import { mangas } from '@/data/mangas';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section>
        <HeroSlider />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Continuar Leyendo</h2>
        <ContinuarLeyendo />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Últimos Lanzamientos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
}