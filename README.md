# 📚 Proyecto Página Manga

## Descripción General

**Proyecto Página Manga** es una aplicación web moderna desarrollada en grupo que permite a los usuarios leer mangas, manhwas y otras obras de forma sencilla y cómoda. Esta es una plataforma completa construida con las tecnologías más actuales del ecosistema de React y Next.js, diseñada para ser escalable, mantenible y fácil de expandir.

### Objetivos del Proyecto

- ✅ Crear una plataforma intuitiva para la lectura de mangas y manhwas
- ✅ Proporcionar una experiencia de usuario fluida y responsive
- ✅ Mantener un código limpio, tipado y bien documentado
- ✅ Facilitar la colaboración en equipo
- ✅ Escalar la aplicación de manera modular
- ✅ Gestionar historial de lectura e historial del usuario

---

## 🏗️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| **Next.js** | 16.2.6 | Framework React con SSR, SSG y rutas automáticas |
| **React** | 19.2.4 | Librería de componentes UI |
| **React DOM** | 19.2.4 | Renderizado en el navegador |
| **TypeScript** | ^5 | Tipado estricto y seguridad de tipos |
| **Tailwind CSS** | ^4 | Framework CSS utility-first |
| **Lucide React** | ^1.17.0 | Librería de iconos SVG optimizados |
| **Swiper** | ^12.2.0 | Carrusel/slider avanzado y responsive |

### Herramientas de Desarrollo

| Herramienta | Versión | Propósito |
|---|---|---|
| **pnpm** | Gestor de paquetes | Gestor de dependencias rápido y eficiente |
| **ESLint** | ^9 | Linter de código para mantener consistencia |
| **PostCSS** | ^4 | Procesador de CSS |
| **TypeScript** | ^5 | Compilador de TypeScript |

### Estadísticas de Lenguajes

- **TypeScript**: 78.1% - Código tipado y componentes React
- **JavaScript**: 11.7% - Configuraciones y scripts
- **CSS**: 10.2% - Estilos y personalización

---

## 📁 Estructura General del Proyecto

```
proyecto-pagina-manga/
├── 📂 app/                          # Carpeta principal de Next.js (App Router)
│   ├── 📂 biblioteca/               # Ruta: Biblioteca del usuario
│   ├── 📂 explorar/                 # Ruta: Página de exploración
│   ├── 📂 favoritos/                # Ruta: Mangas favoritos
│   ├── 📂 login/                    # Ruta: Página de login
│   ├── 📂 manhwas/                  # Ruta: Sección de manhwas
│   ├── 📂 perfil/                   # Ruta: Perfil del usuario
│   ├── 📂 series/                   # Ruta: Series de mangas
│   ├── favicon.ico                  # Icono de la pestaña del navegador
│   ├── globals.css                  # Estilos CSS globales de la aplicación
│   ├── layout.tsx                   # Layout raíz que envuelve todas las páginas
│   └── page.tsx                     # Página principal (Home)
│
├── 📂 components/                   # Componentes React reutilizables
│   ├── ContinuarLeyendo.tsx        # Componente de mangas continuando
│   ├── Footer.tsx                   # Pie de página
│   ├── HeroSlider.tsx               # Carrusel hero principal
│   ├── MangaCard.tsx                # Tarjeta individual de manga
│   └── Navbar.tsx                   # Barra de navegación
│
├── 📂 data/                         # Datos estáticos y configuraciones
│   └── mangas.ts                    # Base de datos de mangas
│
├── 📂 types/                        # Tipos TypeScript globales
│
├── 📂 public/                       # Assets públicos accesibles directamente
│   ├── next.svg                     # Logo de Next.js
│   ├── vercel.svg                   # Logo de Vercel
│   └── ...
│
├── 📄 package.json                  # Dependencias y scripts del proyecto
├── 📄 tsconfig.json                 # Configuración de TypeScript
├── 📄 next.config.ts                # Configuración de Next.js
├── 📄 eslint.config.mjs             # Configuración de ESLint
├── 📄 postcss.config.mjs            # Configuración de PostCSS
├── 📄 pnpm-workspace.yaml           # Configuración del workspace de pnpm
├── 📄 pnpm-lock.yaml                # Lock file con versiones exactas
├── 📄 LICENSE                       # Licencia MIT del proyecto
├── 📄 README.md                     # Este archivo
└── 📄 .gitignore                    # Archivos ignorados por Git
```

---

## 🎯 Carpeta `app/` - Rutas y Páginas de la Aplicación

La carpeta `app/` es el corazón de la aplicación. Utiliza el **App Router** de Next.js 16, que es el sistema de rutas moderno. Cada subcarpeta dentro de `app/` representa una ruta diferente en la aplicación.

### 📊 Estructura Detallada de `app/`

```
app/
├── favicon.ico              # 25.9 KB - Icono visual
├── globals.css             # Estilos globales
├── layout.tsx              # Layout raíz principal
├── page.tsx                # Página de inicio /
├── biblioteca/
│   └── page.tsx            # Ruta: /biblioteca
├── explorar/
│   └── page.tsx            # Ruta: /explorar
├── favoritos/
│   └── page.tsx            # Ruta: /favoritos
├── login/
│   └── page.tsx            # Ruta: /login
├── manhwas/
│   └── page.tsx            # Ruta: /manhwas
├── perfil/
│   └── page.tsx            # Ruta: /perfil
└── series/
    └── page.tsx            # Ruta: /series
```

---

### 🏠 Archivo: `page.tsx` - Página Principal (Home)

#### ¿Qué es?
Es la página principal (Home) de la aplicación. Es lo que ven los usuarios cuando acceden a `http://localhost:3000/`.

#### Contenido Principal
La página home incluye:
1. **Navbar**: Barra de navegación superior
2. **HeroSlider**: Carrusel con mangas destacados
3. **ContinuarLeyendo**: Sección con mangas en progreso
4. **Footer**: Pie de página

#### Estructura
```tsx
<>
  <Navbar />
  <HeroSlider />
  <ContinuarLeyendo />
  <Footer />
</>
```

#### Características
- ✅ Componentes modulares
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Carga de datos desde `data/mangas.ts`

---

### 🗂️ Rutas Disponibles

#### 1. **`/` - Página Principal (Home)**
- **Archivo**: `page.tsx`
- **Descripción**: Página de inicio con hero slider y mangas en progreso
- **Componentes**: Navbar, HeroSlider, ContinuarLeyendo, Footer

#### 2. **`/biblioteca` - Biblioteca del Usuario**
- **Archivo**: `app/biblioteca/page.tsx`
- **Descripción**: Muestra todos los mangas en la biblioteca del usuario
- **Funcionalidad**: Gestión de mangas guardados

#### 3. **`/explorar` - Exploración de Mangas**
- **Archivo**: `app/explorar/page.tsx`
- **Descripción**: Página para descubrir nuevos mangas
- **Funcionalidad**: Búsqueda, filtros, categorías

#### 4. **`/favoritos` - Mangas Favoritos**
- **Archivo**: `app/favoritos/page.tsx`
- **Descripción**: Mangas marcados como favoritos
- **Funcionalidad**: Gestión de favoritos

#### 5. **`/login` - Autenticación**
- **Archivo**: `app/login/page.tsx`
- **Descripción**: Formulario de login/registro
- **Funcionalidad**: Autenticación de usuarios

#### 6. **`/manhwas` - Sección de Manhwas**
- **Archivo**: `app/manhwas/page.tsx`
- **Descripción**: Exclusiva para manhwas (cómics coreanos)
- **Funcionalidad**: Categoría separada para manhwas

#### 7. **`/perfil` - Perfil del Usuario**
- **Archivo**: `app/perfil/page.tsx`
- **Descripción**: Información del perfil del usuario
- **Funcionalidad**: Edición de perfil, historial de lectura

#### 8. **`/series` - Series de Mangas**
- **Archivo**: `app/series/page.tsx`
- **Descripción**: Series completas de mangas
- **Funcionalidad**: Gestión de series

---

### 🎨 Archivo: `layout.tsx` - Layout Raíz

#### ¿Qué es?
Es el Layout raíz (RootLayout) que envuelve TODAS las páginas de la aplicación.

#### Importaciones

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```

#### Configuración de Fuentes

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

- `Geist`: Fuente sans-serif moderna para texto general
- `Geist_Mono`: Fuente monoespaciada para código

#### Metadatos

```typescript
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

**TODO**: Actualizar estos valores con información del proyecto Manga.

#### Estructura HTML

```typescript
return (
  <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
    <body className="min-h-full flex flex-col">
      {children}
    </body>
  </html>
);
```

#### Características Principales
- ✅ Fuentes optimizadas de Google
- ✅ Responsive design con Tailwind CSS
- ✅ Soporte para tema claro/oscuro
- ✅ Tipado completo con TypeScript
- ✅ Metadatos para SEO

---

### 💅 Archivo: `globals.css` - Estilos Globales

#### Contenido Simplificado

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

#### ¿Qué Hace?
- **@import "tailwindcss"**: Importa todas las clases Tailwind
- **Variables CSS**: Define colores para tema claro/oscuro
- **@theme inline**: Configura el tema de Tailwind
- **@media (prefers-color-scheme: dark)**: Activa modo oscuro automático
- **body**: Estilos base del documento

#### Tema Automático
El navegador detecta automáticamente la preferencia del SO y aplica los colores correspondientes.

---

## 🧩 Carpeta `components/` - Componentes Reutilizables

La carpeta `components/` contiene componentes React funcionales que se utilizan en diferentes partes de la aplicación.

### 📋 Componentes Existentes

```
components/
├── ContinuarLeyendo.tsx     # Componente de mangas en progreso
├── Footer.tsx               # Pie de página
├── HeroSlider.tsx           # Carrusel hero
├── MangaCard.tsx            # Tarjeta de manga
└── Navbar.tsx               # Barra de navegación
```

---

### 📝 Componente: `Navbar.tsx`

#### ¿Qué es?
Componente de la barra de navegación superior que aparece en todas las páginas.

#### Funcionalidad
```typescript
- Logo de la aplicación
- Enlaces de navegación (Inicio, Explorar, Biblioteca, etc.)
- Búsqueda
- Menú de usuario
- Cambio de tema (claro/oscuro)
```

#### Props
```typescript
// No requiere props, funciona de manera independiente
```

#### Dónde se Usa
- En el `page.tsx` de la página principal
- En el `layout.tsx` como componente global

#### Características Principales
- ✅ Navegación responsive
- ✅ Menú hamburguesa en móvil
- ✅ Buscador integrado
- ✅ Soporte para dark mode
- ✅ Animaciones suaves

---

### 📝 Componente: `HeroSlider.tsx`

#### ¿Qué es?
Carrusel (slider) con los mangas destacados y promocionados.

#### Funcionalidad
```typescript
- Muestra mangas destacados
- Carrusel automático que cambia cada 5 segundos
- Navegación con flechas
- Información del manga al pasar el mouse
- Botones de acción (Leer, Agregar a favoritos)
```

#### Datos que Utiliza
```typescript
import { BASE_DATOS_MANGAS } from '@/data/mangas';
```

#### Características del Slider
- ✅ Usa la librería **Swiper** para carousel
- ✅ Autoplay con intervalo configurable
- ✅ Navegación con teclado y mouse
- ✅ Responsive (diferente número de slides en móvil/desktop)
- ✅ Animaciones suaves
- ✅ Información flotante sobre los mangas

#### Estructura de Datos que Espera
```typescript
{
  id: string;
  titulo: string;
  sinopsis: string;
  imagen: string;
  estado: 'Emisión' | 'Finalizado';
  generos: string[];
}
```

---

### 📝 Componente: `MangaCard.tsx`

#### ¿Qué es?
Tarjeta individual que muestra información de un manga.

#### Funcionalidad
```typescript
- Muestra la portada del manga
- Título y autor
- Géneros
- Estado (En emisión, Finalizado, Cancelado)
- Calificación
- Botones de acción
```

#### Props
```typescript
interface MangaCardProps {
  id: string;
  titulo: string;
  imagen: string;
  generos: string[];
  estado: 'Emisión' | 'Finalizado' | 'Cancelado';
  calificacion?: number;
}
```

#### Uso
```tsx
<MangaCard
  id="solo-leveling"
  titulo="Solo Leveling"
  imagen="url-imagen"
  generos={["Acción", "Fantasía"]}
  estado="Emisión"
  calificacion={9.2}
/>
```

#### Características
- ✅ Efecto hover con escala
- ✅ Badges de estado
- ✅ Información compacta
- ✅ Clickeable (redirige a detalles)
- ✅ Dark mode support

---

### 📝 Componente: `ContinuarLeyendo.tsx`

#### ¿Qué es?
Componente que muestra los mangas que el usuario está leyendo actualmente.

#### Funcionalidad
```typescript
- Carga datos del localStorage
- Muestra mangas en progreso
- Indica el capítulo guardado
- Botón para continuar leyendo
- Grid responsive
```

#### Datos Guardados
Utiliza `localStorage` para guardar el progreso:
```json
{
  "sumi_progreso": {
    "id-manga": "número-capítulo",
    "otro-manga": "otro-capítulo"
  }
}
```

#### Estructura
```tsx
<section>
  <h3>Continuar Leyendo</h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
    {/* MangaCards con botón Play */}
  </div>
</section>
```

#### Características
- ✅ Carga datos del localStorage
- ✅ Grid flexible (7 columnas en desktop)
- ✅ Botón flotante con icono Play
- ✅ Información del capítulo guardado
- ✅ Fallback si no hay datos
- ✅ Animaciones al cargar

#### Mapeo de Datos
```typescript
// Busca los mangas en BASE_DATOS_MANGAS por ID
// Muestra portada, título y capítulo guardado
// Enlace a: /ver/{id}/{capítulo}
```

---

### 📝 Componente: `Footer.tsx`

#### ¿Qué es?
Pie de página con información y enlaces.

#### Funcionalidad
```typescript
- Logo/Nombre de la aplicación
- Enlaces rápidos
- Redes sociales
- Información de copyright
- Términos y privacidad
```

#### Estructura
```tsx
<footer>
  <div>Logo y descripción</div>
  <div>Enlaces principales</div>
  <div>Redes sociales</div>
  <div>Copyright</div>
</footer>
```

#### Características
- ✅ Responsive (diferentes columnas en móvil/desktop)
- ✅ Dark mode support
- ✅ Enlaces internos/externos
- ✅ Iconos de redes sociales

---

### 🎨 Buenas Prácticas para Componentes

1. **Tipado Completo**
```typescript
interface ComponentProps {
  titulo: string;
  onClick: () => void;
  activo?: boolean;
}
```

2. **Componentes Pequeños**: Una responsabilidad clara

3. **Props Configurables**: Permitir personalización

4. **Dark Mode**
```typescript
className="bg-white dark:bg-gray-800"
```

5. **Accesibilidad**: Etiquetas, roles ARIA, etc.

6. **Reutilización**: Si repites código, crea un componente

7. **Nombres Descriptivos**: `MangaCard` > `Card1`

---

## 📊 Carpeta `data/` - Datos Estáticos

La carpeta `data/` centraliza los datos estáticos de la aplicación.

### 📁 Estructura Actual

```
data/
└── mangas.ts              # Base de datos de mangas
```

---

### 📝 Archivo: `data/mangas.ts`

#### ¿Qué es?
Base de datos central con todos los mangas disponibles en la plataforma.

#### Interfaces Definidas

```typescript
export interface Capitulo {
  id: string;
  numero: string;
  paginas: string[];  // Array de URLs de imágenes
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
```

#### Estructura de un Manga

```typescript
{
  id: "solo-leveling-ragnarok",
  titulo: "Solo Leveling: Ragnarok",
  sinopsis: "La secuela oficial del legendario manhwa...",
  imagen: "https://images.unsplash.com/...",
  estado: "Emisión",
  generos: ["Acción", "Fantasía", "Aventura"],
  capitulos: [
    {
      id: "1",
      numero: "1",
      paginas: [
        "https://images.unsplash.com/...",
        "https://images.unsplash.com/...",
        // más páginas
      ]
    },
    // más capítulos
  ]
}
```

#### Datos Disponibles (Ejemplos)

El archivo contiene mangas reales como:
- **Solo Leveling: Ragnarok** - Acción, Fantasía, Aventura
- **The Beginning After The End** - Fantasía, Isekai, Acción

#### Cómo Usar

```typescript
import { BASE_DATOS_MANGAS } from '@/data/mangas';

// Obtener todos los mangas
const todosLosMangas = BASE_DATOS_MANGAS;

// Buscar manga por ID
const manga = BASE_DATOS_MANGAS.find(m => m.id === 'solo-leveling-ragnarok');

// Filtrar por género
const accion = BASE_DATOS_MANGAS.filter(m => 
  m.generos.includes('Acción')
);

// Obtener capítulos de un manga
const capitulos = manga?.capitulos || [];

// Obtener una página específica
const paginas = manga?.capitulos[0]?.paginas || [];
```

#### Características

- ✅ Datos tipados con TypeScript
- ✅ Fácil de buscar y filtrar
- ✅ Estructura clara y consistente
- ✅ Escalable para agregar más mangas
- ✅ Incluye URLs de imágenes reales

#### Expansión Futura

Se pueden agregar más campos como:
```typescript
{
  // Campos adicionales
  autor: string;
  editorial: string;
  fechaInicio: Date;
  calificacion: number;
  votos: number;
  capituloContinuacion?: string;
  // etc.
}
```

---

## 📦 Carpeta `types/` - Tipos TypeScript

Carpeta para definiciones de tipos globales compartidas en toda la aplicación.

### Uso Recomendado

```typescript
// types/index.ts
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar: string;
}

export interface HistorialLectura {
  idManga: string;
  capituloActual: number;
  fechaUltimosVisto: Date;
}
```

---

## 🚀 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
pnpm dev
# http://localhost:3000

# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Ejecutar linter
pnpm lint
pnpm lint --fix  # Arregla errores automáticamente
```

---

## 🛠️ Configuración del Proyecto

### TypeScript (`tsconfig.json`)
- Tipado estricto (`strict: true`)
- Alias de rutas (`@/*` para importar desde raíz)
- Módulos ES modernos

### Tailwind CSS
- Framework utility-first
- Tema personalizado con variables CSS
- Soporte completo para dark mode
- Clases optimizadas para producción

### ESLint
- Validación de código automática
- Integración con Next.js
- Consistencia de estilos

### Next.js
- App Router (sistema de rutas moderno)
- SSR, SSG y CSR
- Optimización automática de imágenes
- Code splitting

---

## 🌟 Mejores Prácticas de Desarrollo

### 1. Estructura de Carpetas
```
✅ app/
   ├── ruta1/
   ├── ruta2/
   └── page.tsx

✅ components/
   ├── Navbar.tsx
   ├── Footer.tsx
   └── ...

✅ data/
   ├── mangas.ts
   └── ...

✅ types/
   └── index.ts
```

### 2. Nomenclatura
```
Componentes: PascalCase (MangaCard.tsx)
Funciones: camelCase (fetchMangaData)
Constantes: UPPER_SNAKE_CASE (API_BASE_URL)
Interfaces: PascalCase (Manga, Usuario)
```

### 3. Commits Descriptivos
```bash
git commit -m "feat: agregar componente MangaCard"
git commit -m "fix: corregir bug en navbar"
git commit -m "docs: actualizar README"
```

### 4. Ramas de Desarrollo
```bash
git checkout -b feature/nombre-feature
git push origin feature/nombre-feature
# Crear Pull Request en GitHub
```

---

## 📱 Responsividad

La aplicación es completamente responsive:

- **Móvil** (320px - 640px): 1-2 columnas
- **Tablet** (641px - 1024px): 2-4 columnas
- **Desktop** (1025px+): 4-7 columnas

### Clases Tailwind Responsive
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// 1 columna móvil, 2 en tablet, 3 en desktop
```

---

## 🌓 Dark Mode

Soporte automático para tema oscuro:

```typescript
className="bg-white dark:bg-gray-800 text-black dark:text-white"
```

El navegador detecta automáticamente la preferencia del SO.

---

## 🔍 Primeros Pasos

### 1. Clonar la Rama
```bash
git clone https://github.com/Edgar-Lopez-Murcia/proyecto-pagina-manga.git
cd proyecto-pagina-manga
git checkout Actualizacion-readme+login
```

### 2. Instalar Dependencias
```bash
pnpm install
```

### 3. Iniciar Desarrollo
```bash
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000)

### 4. Crear Feature
```bash
git checkout -b feature/mi-feature
# Hacer cambios
pnpm lint --fix
git add .
git commit -m "feat: descripción"
git push origin feature/mi-feature
```

### 5. Pull Request
- Ve a GitHub
- Crea PR desde tu rama
- Espera review del equipo

---

## 📄 Información del Proyecto

| Atributo | Valor |
|---|---|
| **Nombre** | Proyecto Página Manga |
| **Descripción** | Plataforma web para leer mangas y manhwas |
| **Tipo** | Aplicación Web |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Licencia** | MIT |
| **Versión** | 0.1.0 |
| **Estado** | 🟡 En Desarrollo |
| **Rama de Desarrollo** | `Actualizacion-readme+login` |

---

## 🤝 Contribuir

1. **Crea una rama** para tu feature
2. **Sigue las convenciones** de código
3. **Ejecuta linter** antes de commitear
4. **Haz commits descriptivos**
5. **Crea un Pull Request**
6. **Espera review** del equipo

---

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Swiper](https://swiperjs.com)

---

**Última actualización**: Junio 2026  
**Versión del Documento**: 2.0.0  
**Rama**: `Actualizacion-readme+login`  
**Mantenido por**: Equipo de Desarrollo del Proyecto Manga

---

*Este README documenta la rama de desarrollo. No realizar cambios en la rama main sin revisión del equipo.*
