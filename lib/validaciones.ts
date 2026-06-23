
// VALIDAR EMAIL

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// VALIDA CONTRASEÑA
export function validarContraseña(password: string) {
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