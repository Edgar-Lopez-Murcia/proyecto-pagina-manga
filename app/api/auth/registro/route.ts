import { NextRequest, NextResponse } from 'next/server';
import { crearUsuario } from '@/lib/usuarios';
import { validarEmail, validarContraseña } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, contraseña } = await request.json();

    // Validaciones
    if (!nombre || !email || !contraseña) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (nombre.length < 3) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 3 caracteres' },
        { status: 400 }
      );
    }

    if (!validarEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    const validacion = validarContraseña(contraseña);
    if (!validacion.valida) {
      return NextResponse.json(
        { error: validacion.errores[0] },
        { status: 400 }
      );
    }

    // Crear usuario
    const usuario = await crearUsuario(nombre, email, contraseña);

    // No devolver la contraseña hasheada
    const { contraseña: _, ...usuarioSinContraseña } = usuario;

    const response = NextResponse.json(
      { usuario: usuarioSinContraseña, mensaje: 'Usuario creado exitosamente' },
      { status: 201 }
    );

    // Opcional: Crear cookie de sesión
    response.cookies.set('sumi_session', JSON.stringify(usuarioSinContraseña), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
    });

    return response;
  } catch (error) {
    console.error('Error en registro:', error);
    const mensaje =
      error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
