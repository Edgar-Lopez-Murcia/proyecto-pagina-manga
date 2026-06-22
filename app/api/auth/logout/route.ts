import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { mensaje: 'Sesión cerrada' },
    { status: 200 }
  );

  // Eliminar cookie de sesión
  response.cookies.delete('sumi_session');

  return response;
}
