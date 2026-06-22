import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Tipos
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  contraseña: string;
  fechaRegistro: string;
  avatar: string | null;
  preferencias: {
    temaOscuro: boolean;
    notificaciones: boolean;
    idioma: string;
  };
}

export interface UsuariosDB {
  usuarios: Usuario[];
}

// Ruta del archivo JSON
const rutaUsuarios = path.join(process.cwd(), 'public', 'usuarios.json');

// ✅ LEER TODOS LOS USUARIOS
export async function leerUsuarios(): Promise<Usuario[]> {
  try {
    if (!fs.existsSync(rutaUsuarios)) {
      return [];
    }
    const contenido = fs.readFileSync(rutaUsuarios, 'utf-8');
    const datos: UsuariosDB = JSON.parse(contenido);
    return datos.usuarios || [];
  } catch (error) {
    console.error('Error al leer usuarios:', error);
    return [];
  }
}

// ✅ GUARDAR USUARIOS
export async function guardarUsuarios(usuarios: Usuario[]): Promise<void> {
  try {
    const datos: UsuariosDB = { usuarios };
    fs.writeFileSync(rutaUsuarios, JSON.stringify(datos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar usuarios:', error);
    throw error;
  }
}

// ✅ VERIFICAR SI EMAIL EXISTE
export async function usuarioExiste(email: string): Promise<boolean> {
  const usuarios = await leerUsuarios();
  return usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

// ✅ HASH DE CONTRASEÑA (simple para demo)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// ✅ COMPARAR CONTRASEÑA
export function compararPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ✅ CREAR NUEVO USUARIO
export async function crearUsuario(
  nombre: string,
  email: string,
  contraseña: string
): Promise<Usuario> {
  // Validar si email ya existe
  if (await usuarioExiste(email)) {
    throw new Error('El email ya está registrado');
  }

  const nuevoUsuario: Usuario = {
    id: `user-${Date.now()}`,
    nombre,
    email: email.toLowerCase(),
    contraseña: hashPassword(contraseña),
    fechaRegistro: new Date().toISOString(),
    avatar: null,
    preferencias: {
      temaOscuro: true,
      notificaciones: true,
      idioma: 'es',
    },
  };

  const usuarios = await leerUsuarios();
  usuarios.push(nuevoUsuario);
  await guardarUsuarios(usuarios);

  return nuevoUsuario;
}

// ✅ OBTENER USUARIO POR EMAIL
export async function obtenerUsuario(email: string): Promise<Usuario | null> {
  const usuarios = await leerUsuarios();
  return usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// ✅ VALIDAR LOGIN
export async function validarLogin(
  email: string,
  contraseña: string
): Promise<Usuario | null> {
  const usuario = await obtenerUsuario(email);
  if (!usuario) return null;

  if (compararPassword(contraseña, usuario.contraseña)) {
    return usuario;
  }

  return null;
}
