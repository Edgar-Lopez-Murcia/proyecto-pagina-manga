'use client';

// Tipos de sesión
export interface Sesion {
  id: string;
  email: string;
  nombre: string;
  fechaLogin: string;
  expira: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  contraseña?: string;
}

// Clave de localStorage
const CLAVE_SESION = 'sumi_session';

// ✅ CREAR SESIÓN
export function crearSesion(usuario: Usuario): void {
  const ahora = new Date();
  const expiracion = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 días

  const sesion: Sesion = {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    fechaLogin: ahora.toISOString(),
    expira: expiracion.toISOString(),
  };

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

// ✅ OBTENER SESIÓN
export function obtenerSesion(): Sesion | null {
  try {
    const sesionRaw = localStorage.getItem(CLAVE_SESION);
    if (!sesionRaw) return null;

    const sesion: Sesion = JSON.parse(sesionRaw);
    return sesion;
  } catch (error) {
    console.error('Error al obtener sesión:', error);
    return null;
  }
}

// ✅ CERRAR SESIÓN
export function cerrarSesion(): void {
  localStorage.removeItem(CLAVE_SESION);
}

// ✅ VERIFICAR SI SESIÓN ES VÁLIDA
export function sesionValida(): boolean {
  try {
    const sesion = obtenerSesion();
    if (!sesion) return false;

    const ahora = new Date();
    const expira = new Date(sesion.expira);

    return ahora < expira;
  } catch (error) {
    return false;
  }
}

// ✅ VALIDAR EMAIL
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ VALIDAR CONTRASEÑA
export function validarContraseña(password: string): {
  valida: boolean;
  errores: string[];
} {
  const errores: string[] = [];

  if (password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (!/\d/.test(password)) {
    errores.push('La contraseña debe contener al menos 1 número');
  }

  return {
    valida: errores.length === 0,
    errores,
  };
}

// ✅ GENERAR ID ÚNICO
export function generarId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
