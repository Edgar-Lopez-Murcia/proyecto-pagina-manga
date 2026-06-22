import { NextRequest, NextResponse } from 'next/server';
import { validarLogin } from '@/lib/usuarios';

export async function POST(request: NextRequest) {
  try {
    const { email, contraseña } = await request.json();

    if (!email || !contraseña) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const usuario = await validarLogin(email, contraseña);

    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // No devolver la contraseña hasheada
    const { contraseña: _, ...usuarioSinContraseña } = usuario;

    const response = NextResponse.json(
      { usuario: usuarioSinContraseña, mensaje: 'Login exitoso' },
      { status: 200 }
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
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
