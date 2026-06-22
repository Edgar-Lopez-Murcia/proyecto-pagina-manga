import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas protegidas (requieren login)
const rutasProtegidas = [
  '/biblioteca',
  '/explorar',
  '/favoritos',
  '/perfil',
  '/series',
  '/manhwas',
  '/dashboard',
];

// Rutas públicas de auth
const rutasPublicas = ['/auth/landing', '/auth/login', '/auth/registro'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener sesión de cookies (si es que existen)
  const sesion = request.cookies.get('sumi_session')?.value;

  // Si intenta acceder a ruta protegida sin sesión
  if (rutasProtegidas.some((ruta) => pathname === ruta || pathname.startsWith(ruta + '/'))) {
    if (!sesion) {
      return NextResponse.redirect(new URL('/auth/landing', request.url));
    }
  }

  // Si intenta acceder a ruta auth CON sesión, redirigir a home
  if (rutasPublicas.includes(pathname)) {
    if (sesion) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configurar en qué rutas aplicar el middleware
export const config = {
  matcher: [
    /*
     * Excluir:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - public files (archivos públicos)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)',
  ],
};
