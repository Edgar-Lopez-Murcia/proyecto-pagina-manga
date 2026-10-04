# 📚 Proyecto Página Manga

## Descripción General

**Proyecto Página Manga** es una aplicación web desarrollada en grupo que permite a los usuarios leer mangas de forma sencilla y cómoda. La plataforma está construida con tecnologías modernas como Next.js, React y TypeScript, proporcionando una experiencia de usuario fluida y responsiva.

### Stack Tecnológico

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Dependencias Principales**:
  - `lucide-react`: Librería de iconos
  - `swiper`: Carrusel/slider de contenido
  - `tailwindcss`: Framework CSS utility-first
- **Herramientas de Desarrollo**:
  - ESLint: Linter de código
  - PostCSS: Procesador de CSS
  - pnpm: Gestor de paquetes

### Lenguajes Utilizados

- **TypeScript**: 78.1%
- **JavaScript**: 11.7%
- **CSS**: 10.2%

---

## 📁 Estructura del Proyecto

### Raíz del Proyecto

```
proyecto-pagina-manga/
├── app/                      # Carpeta principal de la aplicación
├── components/               # Componentes reutilizables
├── data/                     # Datos y archivos estáticos
├── public/                   # Assets públicos
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
├── next.config.ts           # Configuración de Next.js
├── eslint.config.mjs        # Configuración de ESLint
├── postcss.config.mjs       # Configuración de PostCSS
├── pnpm-workspace.yaml      # Configuración del workspace
└── pnpm-lock.yaml           # Lock file de dependencias
```

---

## 🎯 Carpeta `app/` - Núcleo de la Aplicación

La carpeta `app/` contiene la estructura principal de la aplicación Next.js usando el App Router. Este es el corazón del proyecto donde se define la estructura de rutas y el layout general.

### Estructura de la Carpeta

```
app/
├── favicon.ico              # Icono de la pestaña del navegador
├── globals.css              # Estilos globales de la aplicación
├── layout.tsx               # Layout raíz de la aplicación
└── page.tsx                 # Página principal (Home)
```

### Archivos Detallados

#### **favicon.ico** (25.9 KB)
- Icono que aparece en la pestaña del navegador
- Proporciona identidad visual al proyecto
- Formato: Icon (.ico)

#### **globals.css** (488 bytes)
```css
- Importa la librería Tailwind CSS
- Define variables CSS personalizadas para tema claro/oscuro:
  - --background: Color de fondo (#ffffff en claro, #0a0a0a en oscuro)
  - --foreground: Color del texto (#171717 en claro, #ededed en oscuro)
- Configura la paleta de colores con Tailwind (@theme)
- Define fuentes personalizadas (Geist Sans y Geist Mono)
- Estilos base del body con soporte para modo oscuro
```

**Qué Contiene**:
- Importación de Tailwind CSS para utilizar clases utility
- Configuración de tema global con soporte para dark mode
- Variables CSS personalizadas para colores
- Definición de fuentes (Geist Sans para texto normal, Geist Mono para código)
- Estilos base del cuerpo del documento

#### **layout.tsx** (719 bytes)
**Propósito**: Layout raíz que envuelve todas las páginas de la aplicación.

**Contenido**:
- Importa fuentes personalizadas de Google (Geist y Geist Mono)
- Define metadatos de la página (título y descripción)
- Estructura HTML raíz con:
  - Idioma configurado en inglés
  - Clases de Tailwind CSS para tipografía y antialiasing
  - Body con altura mínima y diseño flexbox
- Renderiza `{children}` para el contenido dinámico

**Características**:
- Responsive design con Tailwind CSS
- Soporte para fuentes optimizadas
- Estructura semántica HTML5
- Antialiasing automático para texto más suave

**Uso**:
Es el componente padre que envuelve todas las páginas. Cualquier cambio aquí afecta a toda la aplicación.

#### **page.tsx** (2.8 KB)
**Propósito**: Página principal (Home) del sitio web.

**Contenido**:
- Componente funcional que representa la página de inicio
- Diseño limpio con flexbox y centrado
- Uso de componente `Image` de Next.js para optimización
- Fondo responsive (zinc-50 claro, negro oscuro)
- Sección principal con ancho máximo (max-w-3xl)

**Elementos Incluidos**:
1. **Logo de Next.js**: Imagen SVG optimizada con Next.js
2. **Sección de Bienvenida**:
   - Título: "To get started, edit the page.tsx file"
   - Descripción con enlaces a Templates y Learning center
3. **Botones de Acción**:
   - "Deploy Now": Deploy en Vercel con icono
   - "Documentation": Acceso a documentación de Next.js
4. **Responsive Design**: Diseño adaptable para móvil y desktop

**Clases Tailwind Utilizadas**:
- `flex`, `flex-col`: Flexbox layout
- `items-center`, `justify-center`: Centrado
- `max-w-3xl`: Ancho máximo responsivo
- `bg-zinc-50`, `dark:bg-black`: Tema claro/oscuro
- `sm:items-start`: Breakpoint para pequeñas pantallas
- `hover:bg-[#383838]`: Efecto hover en botones

---

## 🧩 Carpeta `components/` - Componentes Reutilizables

> **Estado**: La carpeta `components/` está disponible pero actualmente no contiene archivos. Esta es la ubicación designada para almacenar componentes React reutilizables.

### Propósito

La carpeta `components/` está destinada a contener componentes React funcionales que se utilizarán en diferentes partes de la aplicación. Ejemplos de componentes que podrían incluirse:

#### Componentes de UI (Usuario Interface):
- **Header/Navbar**: Barra de navegación superior
- **Footer**: Pie de página
- **Sidebar/Menu**: Menú lateral
- **Buttons**: Botones personalizados reutilizables
- **Cards**: Tarjetas de contenido
- **Modales**: Ventanas modales emergentes
- **Tooltips**: Ayudas emergentes
- **Forms**: Formularios e inputs

#### Componentes de Dominio (Específicos del Negocio):
- **MangaCard**: Tarjeta para mostrar información de un manga con portada, título, autor
- **ChapterList**: Lista de capítulos de un manga específico
- **Reader**: Lector de mangas con visor de imágenes
- **SearchBar**: Buscador de mangas con autocompletado
- **CategoryFilter**: Filtro por categorías y géneros
- **UserProfile**: Perfil de usuario con historial de lecturas
- **Ratings**: Calificaciones y reseñas
- **Pagination**: Paginación para listas

#### Componentes de Diseño (Layout):
- **Grid layouts**: Sistemas de grillas responsivas
- **Containers**: Contenedores reutilizables
- **Wrappers**: Envolventes para secciones
- **Secciones reutilizables**: Plantillas de layout común

### Estructura Recomendada

```
components/
├── common/                      # Componentes comunes
│   ├── Header.tsx              # Encabezado/Navbar
│   ├── Footer.tsx              # Pie de página
│   ├── Navigation.tsx          # Navegación
│   └── Sidebar.tsx             # Barra lateral
├── manga/                       # Componentes específicos de manga
│   ├── MangaCard.tsx           # Tarjeta de manga
│   ├── ChapterList.tsx         # Lista de capítulos
│   ├── MangaReader.tsx         # Lector de manga
│   ├── MangaGrid.tsx           # Grid de mangas
│   └── MangaDetails.tsx        # Detalles de manga
├── ui/                          # Componentes de UI base
│   ├── Button.tsx              # Botones
│   ├── Card.tsx                # Tarjetas genéricas
│   ├── Modal.tsx               # Modales
│   ├── Input.tsx               # Inputs
│   ├── Badge.tsx               # Etiquetas
│   └── Spinner.tsx             # Loading spinner
├── search/                      # Componentes de búsqueda
│   ├── SearchBar.tsx           # Barra de búsqueda
│   ├── Filters.tsx             # Filtros
│   └── CategoryFilter.tsx      # Filtro de categorías
└── user/                        # Componentes de usuario
    ├── UserProfile.tsx         # Perfil de usuario
    ├── UserMenu.tsx            # Menú de usuario
    └── LoginForm.tsx           # Formulario de login
```

### Cómo Usar los Componentes

Cuando agregues componentes a esta carpeta, sigue este patrón:

```typescript
// components/manga/MangaCard.tsx
import React from 'react';

interface MangaCardProps {
  title: string;
  author: string;
  cover: string;
  rating: number;
}

export default function MangaCard({ title, author, cover, rating }: MangaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={cover} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{author}</p>
      <div className="mt-2 flex items-center">
        <span className="text-yellow-500">⭐ {rating}</span>
      </div>
    </div>
  );
}
```

---

## 📊 Carpeta `data/` - Datos y Archivos Estáticos

> **Estado**: La carpeta `data/` está disponible pero actualmente no contiene archivos. Esta es la ubicación designada para almacenar datos estáticos y configuraciones.

### Propósito

La carpeta `data/` almacena datos estáticos, configuraciones, mockups y fuentes de datos que la aplicación necesita. Incluye información que no requiere base de datos en tiempo real o datos que se cargan durante la compilación.

### Ejemplos de Contenido Esperado

#### Datos de Mangas
```typescript
- mangas.json / mangas.ts: Lista completa de mangas disponibles
- categories.json: Categorías de mangas (Acción, Romance, etc.)
- genres.json: Géneros disponibles (Shounen, Shoujo, etc.)
- authors.json: Autores/Mangakas del sistema
- publishers.json: Editoriales y publicadores
```

#### Configuraciones
```typescript
- config.ts: Configuraciones globales de la app (URLs, límites, etc.)
- constants.ts: Constantes de la aplicación
- apiConfig.ts: Configuración de APIs externas
- navigation.ts: Rutas de navegación del proyecto
- theme.ts: Configuración de temas personalizados
```

#### Mockups de Datos (para pruebas)
```typescript
- mockMangaData.ts: Datos de prueba para mangas
- mockUsers.ts: Datos de prueba de usuarios
- mockChapters.ts: Datos de capítulos de ejemplo
- mockRatings.ts: Calificaciones de ejemplo
```

#### Recursos Estáticos
```
- translations/ (i18n): Archivos de traducción
  ├── es.json: Textos en español
  └── en.json: Textos en inglés
- metadata/: Metadatos de mangas
- images/: Portadas y assets de imagen
- utils/: Funciones utilitarias
```

### Estructura Recomendada

```
data/
├── mangas/
│   ├── mangas.ts            # Lista de mangas con información
│   ├── categories.ts        # Categorías disponibles
│   ├── genres.ts            # Géneros de mangas
│   ├── authors.ts           # Autores/Mangakas
│   └── publishers.ts        # Editoriales
├── mocks/
│   ├── mockMangaData.ts     # Datos de prueba de mangas
│   ├── mockUsers.ts         # Datos de prueba de usuarios
│   ├── mockChapters.ts      # Capítulos de ejemplo
│   └── mockRatings.ts       # Reseñas y ratings
├── config/
│   ├── config.ts            # Configuración global
│   ├── constants.ts         # Constantes de la app
│   ├── navigation.ts        # Rutas de navegación
│   ├── apiConfig.ts         # Configuración de APIs
│   └── theme.ts             # Tema personalizado
├── translations/
│   ├── es.json              # Textos en español
│   └── en.json              # Textos en inglés
└── utils/
    ├── helpers.ts           # Funciones auxiliares
    └── formatters.ts        # Formateadores de datos
```

### Ejemplos de Archivos

#### **mangas.ts** - Lista de Mangas
```typescript
export const mangas = [
  {
    id: 1,
    title: "One Piece",
    author: "Eiichiro Oda",
    genre: ["Shounen", "Aventura"],
    status: "En Serialización",
    rating: 9.2,
    cover: "/images/one-piece.jpg"
  },
  // ... más mangas
];
```

#### **constants.ts** - Constantes
```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const ITEMS_PER_PAGE = 12;
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_FORMATS = ['jpg', 'png', 'webp'];
```

#### **mockMangaData.ts** - Datos de Prueba
```typescript
export const mockMangas = [
  {
    id: 1,
    title: "Manga de Prueba",
    author: "Autor Test",
    description: "Esta es una prueba",
    rating: 4.5,
    chapters: 50
  },
  // ... más mangas de prueba
];
```

---

## 🚀 Scripts Disponibles

En el archivo `package.json` se encuentran los siguientes scripts:

```bash
# Iniciar servidor de desarrollo (Puerto 3000)
npm run dev
# or
pnpm dev

# Construir para producción
npm run build
# or
pnpm build

# Iniciar servidor de producción
npm run start
# or
pnpm start

# Ejecutar linter para validar código
npm run lint
# or
pnpm lint
```

---

## 🛠️ Configuración del Proyecto

### Tailwind CSS
- Configuración moderna con `@tailwindcss/postcss`
- Tema personalizado en `globals.css`
- Soporte completo para dark mode
- Clases utility-first para estilos rápidos

### TypeScript
- Configuración en `tsconfig.json`
- Tipado estricto para mayor seguridad
- Tipos predefinidos para React y Node.js
- Detecta errores en tiempo de compilación

### ESLint
- Configuración en `eslint.config.mjs`
- Integración con Next.js
- Garantiza consistencia de código
- Identifica problemas potenciales

### PostCSS
- Procesamiento automático de CSS
- Integración con Tailwind CSS
- Minificación de estilos en producción

---

## 📦 Dependencias Principales

### Producción
- **next** (16.2.6): Framework React con SSR y SSG
- **react** (19.2.4): Librería de componentes UI
- **react-dom** (19.2.4): Renderizado en el navegador
- **lucide-react** (^1.17.0): Iconos SVG optimizados
- **swiper** (^12.2.0): Carrusel/slider avanzado y responsivo

### Desarrollo
- **typescript** (^5): Lenguaje tipado para JavaScript
- **tailwindcss** (^4): Framework CSS utility-first
- **@tailwindcss/postcss** (^4): Plugin PostCSS para Tailwind
- **eslint** (^9): Linter de código
- **@types/***: Definiciones de tipo para librerías

---

## 🎨 Características del Diseño

- **Responsive Design**: Funciona perfectamente en móvil, tablet y desktop
- **Dark Mode**: Soporte completo para tema oscuro automático
- **Optimización de Imágenes**: Uso del componente `Image` de Next.js
- **Tipografía Personalizada**: Fuentes Geist importadas de Google
- **Flexbox Layout**: Uso moderno de diseño flexible
- **Modo Antialiasing**: Texto suave y legible
- **Accesibilidad**: Estructura semántica HTML5

---

## 📝 Notas Importantes

1. **En Desarrollo**: Las carpetas `components/` y `data/` están preparadas para recibir contenido según sea necesario.
2. **Estructura Escalable**: El proyecto está diseñado para crecer de forma modular y mantenible.
3. **Trabajo en Equipo**: Este es un proyecto grupal, por lo que se recomienda:
   - Usar ramas separadas para cada feature
   - Mantener la consistencia de código
   - Documentar cambios importantes
   - Realizar code reviews antes de mergear
   - Usar commits descriptivos

4. **Naming Conventions**:
   - Componentes: PascalCase (MangaCard.tsx)
   - Funciones/variables: camelCase (fetchMangaData)
   - Constantes: UPPER_SNAKE_CASE (API_BASE_URL)
   - Archivos de tipo: .ts para TypeScript puro, .tsx para componentes React

---

## 🔧 Primeros Pasos para Desarrollar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Edgar-Lopez-Murcia/proyecto-pagina-manga.git
   cd proyecto-pagina-manga
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

4. **Acceder a la aplicación**:
   - Abre http://localhost:3000 en tu navegador

5. **Crear una rama para tu feature**:
   ```bash
   git checkout -b feature/tu-feature-name
   ```

---

## 📄 Licencia

Este proyecto está bajo licencia especificada en el archivo `LICENSE` del repositorio.

---

**Última actualización**: Junio 2026
**Versión**: 0.1.0
**Mantenido por**: Equipo de Desarrollo del Proyecto Manga
