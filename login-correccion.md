# 🔐 Guía Completa: Sistema de Autenticación y Landing Page

## Descripción General

Este documento describe cómo implementar un sistema de autenticación funcional con una landing page que aparece antes de entrar al proyecto. El sistema está dividido en tres secciones:

1. **Página Principal (Landing)** - Información sobre Sumi y presentación del proyecto
2. **Página de Login** - Iniciar sesión con correo y contraseña
3. **Página de Registro** - Crear una cuenta nueva

Los datos se guardarán en un archivo JSON (`public/usuarios.json`) para propósitos de prueba.

---

## 🎯 Objetivos

- ✅ Crear una landing page informativa y atractiva
- ✅ Implementar un sistema de login funcional con validaciones
- ✅ Implementar un sistema de registro con validaciones
- ✅ Guardar usuarios en archivo JSON (`usuarios.json`)
- ✅ Mantener sesión activa con `localStorage`
- ✅ Proteger rutas privadas del proyecto
- ✅ Reutilizar componentes existentes (Navbar, Footer)
- ✅ Mantener coherencia visual con el resto del proyecto

---

## 📁 Estructura de Carpetas a Modificar/Crear

```
proyecto-pagina-manga/
├── 📂 app/
│   ├── 📂 auth/                     # 🆕 Nueva carpeta para rutas de autenticación
│   │   ├── 📂 login/
│   │   │   └── page.tsx             # Página mejorada de login
│   │   ├── 📂 registro/
│   │   │   └── page.tsx             # 🆕 Página nueva de registro
│   │   ├── 📂 landing/
│   │   │   └── page.tsx             # 🆕 Landing page principal
│   │   └── layout.tsx               # 🆕 Layout específico para auth (sin Navbar/Footer normales)
│   │
│   ├── 📂 (protected)/               # 🆕 Grupo de rutas protegidas (requieren login)
│   │   ├── layout.tsx               # 🆕 Middleware de protección
│   │   ├── 📂 dashboard/
│   │   │   └── page.tsx             # Redirecciona a home o nueva home protegida
│   │   └── ... resto de rutas
│   │
│   ├── layout.tsx                   # Modificar para redirigir sin sesión
│   └── page.tsx                     # Cambiar: redirigir a landing si no hay sesión
│
├── 📂 components/
│   ├── ContinuarLeyendo.tsx         # (Sin cambios)
│   ├── Footer.tsx                   # (Sin cambios)
│   ├── HeroSlider.tsx               # (Sin cambios)
│   ├── MangaCard.tsx                # (Sin cambios)
│   ├── Navbar.tsx                   # (Sin cambios)
│   └── 📂 auth/                     # 🆕 Componentes de autenticación
│       ├── LoginForm.tsx            # 🆕 Formulario de login reutilizable
│       ├── RegisterForm.tsx         # 🆕 Formulario de registro reutilizable
│       └── LandingHero.tsx          # 🆕 Sección hero de landing
│
├── 📂 lib/                          # 🆕 Funciones auxiliares
│   ├── auth.ts                      # 🆕 Funciones de autenticación
│   └── usuarios.ts                  # 🆕 Funciones para manejar JSON de usuarios
│
├── 📂 public/
│   └── usuarios.json                # 🆕 Archivo JSON con usuarios registrados
│
└── middleware.ts                    # 🆕 Middleware para protección de rutas
```

---

## 📋 Archivos a Crear o Modificar

### 1️⃣ Crear: `public/usuarios.json`
Base de datos temporal de usuarios en JSON.

```json
{
  "usuarios": [
    {
      "id": "user-001",
      "nombre": "ByInalik",
      "email": "usuario@example.com",
      "contraseña": "hashed_password_here",
      "fechaRegistro": "2026-06-22T10:30:00Z",
      "avatar": null,
      "preferencias": {
        "temaOscuro": true,
        "notificaciones": true
      }
    }
  ]
}
```

---

### 2️⃣ Crear: `lib/usuarios.ts`
Funciones para leer y escribir usuarios en el JSON.

```typescript
// Prompt para generar este archivo con IA:
/*
CREATE A TYPESCRIPT MODULE FOR MANAGING USERS IN A JSON FILE.

REQUIREMENTS:
- Read users from public/usuarios.json
- Write users to public/usuarios.json
- Validate email format with regex
- Hash passwords using Node.js crypto (or placeholder for demo)
- Check if email already exists
- Create a new user with ID, nombre, email, contraseña, fechaRegistro
- Find user by email and password for login
- Export interfaces: Usuario, UsuariosDB

FUNCTIONS NEEDED:
1. leerUsuarios() - Read all users from JSON
2. guardarUsuarios(usuarios) - Save users to JSON
3. usuarioExiste(email) - Check if email exists
4. crearUsuario(nombre, email, contraseña) - Create and save new user
5. validarLogin(email, contraseña) - Validate login credentials
6. obtenerUsuario(email) - Get user by email
7. hashPassword(password) - Simple hash function (for demo)
8. compararPassword(password, hash) - Compare password with hash

LANGUAGE: TypeScript
*/
```

---

### 3️⃣ Crear: `lib/auth.ts`
Funciones de autenticación y sesión.

```typescript
// Prompt para generar este archivo con IA:
/*
CREATE A TYPESCRIPT MODULE FOR AUTHENTICATION FUNCTIONS.

REQUIREMENTS:
- Manage user sessions in localStorage
- Validate session on app load
- Clear session on logout
- Create session token with user data
- Validate email format
- Validate password strength (min 6 chars, 1 number)
- Generate random user IDs

FUNCTIONS NEEDED:
1. crearSesion(usuario: Usuario) - Save session to localStorage
2. obtenerSesion() - Get current session from localStorage
3. cerrarSesion() - Clear localStorage session
4. sesionValida() - Check if session exists and is valid
5. validarEmail(email: string) - Check email format
6. validarContraseña(password: string) - Check password strength
7. generarId() - Generate unique user ID

EXPORT TYPES:
- Sesion
- Usuario

LANGUAGE: TypeScript
*/
```

---

### 4️⃣ Crear: `app/auth/layout.tsx`
Layout específico para páginas de autenticación (sin Navbar/Footer generales).

```typescript
// Estructura simple:
// - Sin Navbar/Footer
// - Background oscuro (#020306)
// - Contenedor centrado
// - Logo de Sumi en la parte superior
```

---

### 5️⃣ Crear: `app/auth/landing/page.tsx`
Landing page principal con información de Sumi.

```typescript
// COMPONENTES A MOSTRAR:
// 1. Logo y nombre "SUMI" grande
// 2. Descripción: "Plataforma para leer mangas, manhwas y manhuas"
// 3. Sección de características (3-4 puntos):
//    - Leer sin publicidad
//    - Guardar favoritos
//    - Continuar donde dejaste
//    - Comunidad activa
// 4. 2 BOTONES:
//    - "INICIAR SESIÓN" → /auth/login
//    - "CREAR CUENTA" → /auth/registro
// 5. Pie de página con links: Política, Términos, Contacto
```

---

### 6️⃣ Crear: `components/auth/LoginForm.tsx`
Formulario de login reutilizable.

```typescript
// Prompt para generar con IA:
/*
CREATE A REACT LOGIN FORM COMPONENT.

REQUIREMENTS:
- Email input with validation
- Password input
- Submit button
- Loading state during validation
- Error message display
- Link to register page
- Call validarLogin from lib/auth.ts
- Save session to localStorage on success
- Redirect to /dashboard on success
- Show error if login fails

PROPS:
- onSuccess?: () => void (callback after login)

STYLING:
- Use Tailwind CSS
- Match the existing design (dark background, red accents)
- Responsive mobile-first

LANGUAGE: TypeScript with React
*/
```

---

### 7️⃣ Crear: `components/auth/RegisterForm.tsx`
Formulario de registro reutilizable.

```typescript
// Prompt para generar con IA:
/*
CREATE A REACT REGISTER FORM COMPONENT.

REQUIREMENTS:
- Nombre input
- Email input with validation
- Password input with strength indicator
- Confirm password field
- Terms and conditions checkbox
- Submit button
- Loading state during validation
- Error message display (email exists, weak password, etc)
- Link to login page
- Call crearUsuario from lib/usuarios.ts
- Save session after registration
- Redirect to /dashboard on success

PROPS:
- onSuccess?: () => void (callback after registration)

STYLING:
- Use Tailwind CSS
- Match the existing design
- Responsive mobile-first

PASSWORD VALIDATION:
- Min 6 characters
- At least 1 number
- Show strength indicator

LANGUAGE: TypeScript with React
*/
```

---

### 8️⃣ Crear: `components/auth/LandingHero.tsx`
Sección hero de la landing page.

```typescript
// CONTENIDO:
// - Logo grande "SUMI"
// - Frase principal: "Tu plataforma de lectura favorita"
// - Descripción corta
// - 4 características en grid:
//   * 📖 Leer mangas, manhwas y manhuas
//   * ❤️ Guardar tus favoritos
//   * 📍 Continuar donde dejaste
//   * 👥 Comunidad activa
// - Background con gradient o imagen
// - Responsive en móvil
```

---

### 9️⃣ Crear: `middleware.ts`
Middleware para proteger rutas privadas.

```typescript
// NOTA IMPORTANTE: El middleware se ejecuta en el servidor y puede acceder a cookies,
// pero no a localStorage (que es del cliente). Por eso usamos cookies.
// La validación principal se hace en los componentes con sesionValida().

// FUNCIONALIDAD:
// 1. Leer cookie 'sumi_session' desde request.cookies
// 2. Si NO existe cookie y usuario accede a ruta privada → redirect a /auth/landing
// 3. Si NO existe cookie y usuario accede a /auth/* → permitir acceso
// 4. Si existe cookie y usuario accede a /auth/* → redirect a / (home)
// 5. Excluir /api, /_next, imagenes, etc

PROTECTED ROUTES:
- /biblioteca
- /explorar
- /favoritos
- /perfil
- /series
- /manhwas
- / (home)

PUBLIC ROUTES:
- /auth/landing
- /auth/login
- /auth/registro

LANGUAGE: TypeScript
```

---

### 🔟 Modificar: `app/page.tsx`
Proteger la página principal para que rediriga si no hay sesión.

```typescript
// CAMBIOS:
// 1. Agregar "use client" en la parte superior
// 2. Importar useRouter y useEffect desde next
// 3. Importar sesionValida() desde @/lib/auth
// 4. En el useEffect, verificar si hay sesión con sesionValida()
// 5. Si no hay sesión, redirigir a /auth/landing
// 6. Mostrar un loading (Loader2) mientras se valida
// 7. Si hay sesión válida, mostrar el HomePage normal
```

---

### 1️⃣1️⃣ Crear: `app/auth/login/page.tsx`
Página de login mejorada (reemplazar la actual).

```typescript
// ESTRUCTURA:
// 1. Layout de auth (sin Navbar/Footer generales)
// 2. Logo de Sumi en la parte superior
// 3. Título: "INICIA SESIÓN"
// 4. Componente LoginForm
// 5. Link a /auth/registro al final
// 6. Link a /auth/landing (volver atrás)
```

---

### 1️⃣2️⃣ Crear: `app/auth/registro/page.tsx`
Página de registro nueva.

```typescript
// ESTRUCTURA:
// 1. Layout de auth
// 2. Logo de Sumi
// 3. Título: "CREAR CUENTA"
// 4. Componente RegisterForm
// 5. Link a /auth/login al final
// 6. Link a /auth/landing (volver atrás)
```

---

### 1️⃣3️⃣ Crear: `app/api/auth/login/route.ts`
API route para validar credenciales y crear sesión.

```typescript
// FUNCIONALIDAD:
// 1. Recibir POST con { email, contraseña }
// 2. Validar que ambos campos existan
// 3. Llamar a validarLogin(email, contraseña) desde lib/usuarios.ts
// 4. Si válido: retornar usuario (SIN contraseña) con status 200
// 5. Si inválido: retornar error con status 401
// 6. Crear cookie 'sumi_session' con datos del usuario (httpOnly)
// 7. Manejar errores con try/catch y status 500

ENDPOINT: POST /api/auth/login
```

---

### 1️⃣4️⃣ Crear: `app/api/auth/registro/route.ts`
API route para crear nuevo usuario.

```typescript
// FUNCIONALIDAD:
// 1. Recibir POST con { nombre, email, contraseña }
// 2. Validar formato de email
// 3. Validar fortaleza de contraseña
// 4. Validar que nombre tenga mínimo 3 caracteres
// 5. Llamar a crearUsuario(nombre, email, contraseña) desde lib/usuarios.ts
// 6. Si exitoso: retornar usuario (SIN contraseña) con status 201
// 7. Si email existe: retornar error "Email ya registrado" con status 400
// 8. Si password débil: retornar error con status 400
// 9. Crear cookie 'sumi_session' con datos del usuario
// 10. Manejar errores con try/catch

ENDPOINT: POST /api/auth/registro
```

---

### 1️⃣5️⃣ Crear: `app/api/auth/logout/route.ts`
API route para cerrar sesión.

```typescript
// FUNCIONALIDAD:
// 1. Recibir POST
// 2. Eliminar cookie 'sumi_session'
// 3. Retornar mensaje de éxito con status 200
// 4. Frontend redirecciona a /auth/landing

ENDPOINT: POST /api/auth/logout
```

---

## 🔄 Flujo de Autenticación

```
USUARIO SIN SESIÓN
       ↓
   /auth/landing (Landing page)
       ↓
   ┌───────────────────────────────┐
   │ CREAR CUENTA    │    INICIAR  │
   │ /auth/registro  │   /auth/login│
   └───────────────────────────────┘
       ↓                    ↓
  RegisterForm         LoginForm
       ↓                    ↓
  Validar datos      Validar datos
       ↓                    ↓
  Guardar en JSON   Verificar en JSON
       ↓                    ↓
  Crear sesión       Crear sesión
       ↓                    ↓
       └───────────────────┘
              ↓
         / (Home)
              ↓
         USUARIO DENTRO DEL APP
```

---

## 📝 Prompts Recomendados para IA

### Prompt 1: Crear `lib/usuarios.ts`
```
Soy desarrollador de un proyecto Next.js con TypeScript.

Necesito crear un módulo TypeScript que maneje usuarios guardados en un archivo JSON ubicado en public/usuarios.json.

El módulo debe:
1. Leer y escribir en public/usuarios.json usando Node.js (ya que Next.js soporta server functions)
2. Validar emails con regex
3. Hashear contraseñas (puedo usar un hash simple para demo, no bcrypt)
4. Crear nuevos usuarios con ID único, nombre, email, contraseña hasheada, fechaRegistro
5. Verificar si un email ya existe
6. Encontrar usuario por email y contraseña para login

Exporta las siguientes funciones:
- leerUsuarios(): Promise<Usuario[]>
- guardarUsuarios(usuarios: Usuario[]): Promise<void>
- usuarioExiste(email: string): Promise<boolean>
- crearUsuario(nombre: string, email: string, contraseña: string): Promise<Usuario>
- validarLogin(email: string, contraseña: string): Promise<Usuario | null>
- hashPassword(password: string): string
- compararPassword(password: string, hash: string): boolean
- obtenerUsuario(email: string): Promise<Usuario | null>

También exporta las interfaces:
- Usuario (con id, nombre, email, contraseña, fechaRegistro, avatar, preferencias)
- UsuariosDB

El archivo usuarios.json tiene la estructura:
{
  "usuarios": [...]
}

Asegúrate de manejar errores correctamente con try/catch.
```

### Prompt 2: Crear `lib/auth.ts`
```
Soy desarrollador de un proyecto Next.js con TypeScript.

Necesito crear un módulo que maneje la autenticación y sesiones de usuario.

El módulo debe:
1. Gestionar sesiones en localStorage (almacenar y recuperar datos del usuario)
2. Validar formato de email con regex
3. Validar fortaleza de contraseña (mínimo 6 caracteres, al menos 1 número)
4. Generar IDs únicos para usuarios
5. Crear y eliminar sesiones

Exporta estas funciones:
- crearSesion(usuario: Usuario): void
- obtenerSesion(): Sesion | null
- cerrarSesion(): void
- sesionValida(): boolean
- validarEmail(email: string): boolean
- validarContraseña(password: string): { valida: boolean; errores: string[] }
- generarId(): string

Tipos a exportar:
- interface Sesion { id: string; email: string; nombre: string; fechaLogin: string }
- interface Usuario { id: string; nombre: string; email: string; ... }

La clave de localStorage es 'sumi_session'.
Las sesiones tienen expiración de 7 días (opcional).
```

### Prompt 3: Crear `components/auth/LoginForm.tsx`
```
Soy desarrollador de un proyecto Next.js con TypeScript y React.

Necesito crear un componente de formulario de login reutilizable.

Requisitos:
1. Input de email con validación en tiempo real
2. Input de password
3. Botón submit con estado de carga
4. Mostrar errores si faltan campos o login es incorrecto
5. Llamar a API /api/auth/login para validar credenciales
6. Si es exitoso, guardar sesión en localStorage con crearSesion()
7. Redirigir a / (home) después del login
8. Link a /auth/registro para crear cuenta
9. Estados: normal, cargando, error

Props:
- onSuccess?: () => void (callback opcional)

Estilos:
- Usar Tailwind CSS
- Fondo oscuro (#05070B, #020306)
- Acentos rojos (#EF4444)
- Texto gris/blanco
- Responsive mobile-first
- Bordes redondeados (xl, rounded-xl)
- Transiciones suaves

El formulario debe validar:
- Email no vacío y formato válido
- Password no vacío y mínimo 6 caracteres

Usa Server Action o API route para validar credenciales de forma segura.
```

### Prompt 4: Crear `components/auth/RegisterForm.tsx`
```
Soy desarrollador de un proyecto Next.js con TypeScript y React.

Necesito crear un componente de formulario de registro reutilizable.

Requisitos:
1. Input de nombre
2. Input de email con validación en tiempo real
3. Input de password con indicador de fortaleza
4. Input de confirmar password
5. Checkbox de términos y condiciones
6. Botón submit con estado de carga
7. Mostrar errores específicos (email existe, password débil, etc)
8. Si es exitoso, guardar usuario con crearUsuario() y crear sesión
9. Redirigir a / (home) después del registro
10. Link a /auth/login para iniciar sesión

Props:
- onSuccess?: () => void (callback opcional)

Validaciones:
- Nombre: no vacío, mínimo 3 caracteres
- Email: formato válido, no debe existir en la BD
- Password: mínimo 6 caracteres, 1 número
- Confirm password: debe coincidir con password
- Terms: debe estar marcado

Indicador de fortaleza:
- Rojo si es débil
- Amarillo si es medio
- Verde si es fuerte

Estilos: igual al LoginForm (Tailwind, fondo oscuro, acentos rojos)
```

### Prompt 5: Crear `app/auth/landing/page.tsx`
```
Soy desarrollador de un proyecto Next.js con TypeScript.

Necesito crear una landing page informativa para usuarios sin sesión.

Estructura:
1. Encabezado con logo "SUMI" centrado
2. Título grande: "Tu plataforma de lectura favorita"
3. Descripción corta: "Lee mangas, manhwas y manhuas en línea"
4. Grid de 4 características:
   - 📖 Leer sin publicidad: Disfruta de miles de mangas sin interrupciones
   - ❤️ Guardar favoritos: Mantén un registro de tus series preferidas
   - 📍 Continuar leyendo: Retoma donde dejaste automáticamente
   - 👥 Comunidad: Conecta con otros lectores
5. 2 botones destacados:
   - "CREAR CUENTA GRATIS" (rojo, link a /auth/registro)
   - "INICIAR SESIÓN" (blanco/gris, link a /auth/login)
6. Pie de página con links: Política, Términos, Contacto
7. Fondo oscuro con gradiente sutil

Responsive: mobile-first, grid responsive, botones full-width en móvil

Estilos:
- Tailwind CSS
- Colores: #020306, #0F1422 (fondos), #EF4444 (rojo), #FFFFFF (blanco)
- Tipografía: font-black para títulos, uppercase, tracking-wider
- Animate: fade-in en carga, hover effects suaves
```

### Prompt 6: Crear `middleware.ts`
```
Soy desarrollador de un proyecto Next.js 16.2.6 con TypeScript.

Necesito crear un middleware para proteger rutas privadas y redirigir usuarios sin sesión.

Requisitos:
1. Verificar si existe sesión en localStorage (lectura en middleware es limitada, usar cookies si es necesario)
2. Rutas privadas: /biblioteca, /explorar, /favoritos, /perfil, /series, /manhwas, /
3. Rutas públicas: /auth/landing, /auth/login, /auth/registro
4. Si usuario SIN sesión accede a ruta privada → redirigir a /auth/landing
5. Si usuario CON sesión accede a /auth/* → redirigir a / (home)
6. Si usuario CON sesión accede a ruta privada → permitir

Nota: Usar cookies para sesión es más eficiente en middleware que localStorage.

Matcher: considerar todas las rutas excepto /api, /_next, /public, .* (archivos estáticos)
```

---

## 🛠️ Pasos Detallados de Implementación

### PASO 1: Crear la carpeta de autenticación
```bash
# En terminal, desde raíz del proyecto:
mkdir -p app/auth/landing
mkdir -p app/auth/login
mkdir -p app/auth/registro
mkdir -p components/auth
mkdir -p lib
```

### PASO 2: Crear archivos base
```bash
# Archivos TypeScript que necesitas
touch app/auth/layout.tsx
touch app/auth/landing/page.tsx
touch app/auth/login/page.tsx
touch app/auth/registro/page.tsx
touch components/auth/LoginForm.tsx
touch components/auth/RegisterForm.tsx
touch components/auth/LandingHero.tsx
touch lib/auth.ts
touch lib/usuarios.ts
touch middleware.ts
touch public/usuarios.json
```

### PASO 3: Llenar `public/usuarios.json`
Copia el contenido base mostrado arriba.

### PASO 4: Implementar `lib/usuarios.ts`
Usa el Prompt 1 arriba.

### PASO 5: Implementar `lib/auth.ts`
Usa el Prompt 2 arriba.

### PASO 6: Implementar componentes de formulario
- `components/auth/LoginForm.tsx` (Prompt 3)
- `components/auth/RegisterForm.tsx` (Prompt 4)
- `components/auth/LandingHero.tsx` (Prompt 5)

### PASO 7: Crear páginas
- `app/auth/layout.tsx` - Layout sin Navbar/Footer
- `app/auth/landing/page.tsx` - Landing page (Prompt 5)
- `app/auth/login/page.tsx` - Página login mejorada
- `app/auth/registro/page.tsx` - Página registro

### PASO 8: Crear middleware
- `middleware.ts` (Prompt 6)

### PASO 9: Modificar páginas existentes
- `app/layout.tsx` - Redirigir sin sesión
- `app/page.tsx` - Redirigir a `/auth/landing` si no hay sesión

### PASO 10: Pruebas
- Accede a `/` sin sesión → debe redirigir a `/auth/landing`
- En `/auth/landing`, haz click en "Crear cuenta" → va a `/auth/registro`
- En `/auth/registro`, crea una cuenta nueva
- Verifica que el usuario se guardó en `public/usuarios.json`
- Inicia sesión en `/auth/login`
- Verifica que se crea una sesión en `localStorage`
- Intenta acceder a `/biblioteca`, `/explorar`, etc. sin cambios

---

## 💾 Gestión de Datos (JSON)

### Estructura de `public/usuarios.json`
```json
{
  "usuarios": [
    {
      "id": "user-unique-id-123",
      "nombre": "ByInalik",
      "email": "byinalik@example.com",
      "contraseña": "hashed_password_string",
      "fechaRegistro": "2026-06-22T10:30:00Z",
      "avatar": null,
      "preferencias": {
        "temaOscuro": true,
        "notificaciones": true,
        "idioma": "es"
      }
    }
  ]
}
```

### Estructura de Sesión en `localStorage`
```javascript
// localStorage key: 'sumi_session'
{
  "id": "user-unique-id-123",
  "nombre": "ByInalik",
  "email": "byinalik@example.com",
  "fechaLogin": "2026-06-22T15:45:00Z",
  "expira": "2026-06-29T15:45:00Z"
}
```

---

## 🔒 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Esta implementación es para DEMOSTRACIÓN/PRUEBAS.

### En producción, debes:
1. Usar una base de datos real (MongoDB, PostgreSQL, etc.)
2. Usar bcrypt o Argon2 para hashear contraseñas (no plaintext)
3. Implementar JWT tokens en lugar de guardar datos en localStorage
4. Usar HTTPS siempre
5. Validar en backend, no solo en frontend
6. Implementar rate limiting para login/registro
7. Usar cookies httpOnly para sesiones
8. Validar CSRF tokens

---

## 🎨 Diseño y Coherencia Visual

### Colores a mantener:
- **Fondo principal**: `#020306`, `#05070B`
- **Fondo secundario**: `#0F1422`, `#0B0F19`
- **Texto principal**: `#FFFFFF`, `#E5E7EB`
- **Texto secundario**: `#9CA3AF`, `#6B7280`
- **Acentos**: `#EF4444` (rojo), `#A78BFA` (púrpura opcional)
- **Bordes**: `#1F2937`, `#374151`

### Tipografía:
- **Títulos**: `font-black uppercase tracking-wider`
- **Subtítulos**: `font-bold uppercase tracking-widest`
- **Cuerpo**: `font-medium text-xs sm:text-sm`

### Componentes reutilizables:
- Botones rojo principal: `bg-red-600 hover:bg-red-500`
- Botones secundarios: `bg-gray-900 border border-gray-800`
- Inputs: `bg-[#05070B] border border-gray-900 focus:border-red-600`
- Cards: `bg-[#0F1422]/30 border border-gray-900/60`

---

## 🧪 Pruebas Recomendadas

| Caso | Pasos | Resultado Esperado |
|------|-------|-------------------|
| Sin sesión accede a / | Abre el navegador a http://localhost:3000 | Redirige a /auth/landing |
| Landing page | Está en /auth/landing | Ve 4 características y 2 botones |
| Ir a registrarse | Click en "CREAR CUENTA" | Navega a /auth/registro |
| Registrar usuario nuevo | Completa formulario con datos válidos | Se guarda en usuarios.json y sesión creada |
| Email duplicado | Intenta registrar email existente | Muestra error "Email ya registrado" |
| Password débil | Ingresa password con solo letras | Muestra error "Password debe tener número" |
| Términos no marcados | Deja checkbox sin marcar | Botón submit deshabilitado |
| Login exitoso | Ingresa email y password correctos | Se crea sesión y redirige a / |
| Login incorrecto | Ingresa password incorrecta | Muestra error "Credenciales inválidas" |
| Ruta privada sin sesión | Intenta acceder a /biblioteca | Redirige a /auth/landing |
| Logout | Hace click en logout del navbar | Sesión se limpia, redirige a /auth/landing |

---

## 📚 Referencias y Recursos

### Documentación oficial:
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Librerías útiles (opcional):
- `zod` - Validación de esquemas
- `react-hook-form` - Manejo de formularios
- `next-auth` - Autenticación profesional

---

## 📞 Soporte y Preguntas

Si tienes dudas durante la implementación:
1. Usa los **prompts recomendados** con una IA
2. Revisa la **estructura de carpetas** para no perder coherencia
3. Mantén los **estilos Tailwind** consistentes
4. Prueba con los **casos de prueba** arriba

---

## ✅ Checklist de Implementación

- [ ] Crear carpetas necesarias
- [ ] Crear archivos base
- [ ] Implementar `lib/usuarios.ts`
- [ ] Implementar `lib/auth.ts`
- [ ] Crear `components/auth/LoginForm.tsx`
- [ ] Crear `components/auth/RegisterForm.tsx`
- [ ] Crear `components/auth/LandingHero.tsx`
- [ ] Crear `app/auth/layout.tsx`
- [ ] Crear `app/auth/landing/page.tsx`
- [ ] Crear `app/auth/login/page.tsx` mejorado
- [ ] Crear `app/auth/registro/page.tsx`
- [ ] Crear `middleware.ts`
- [ ] Modificar `app/layout.tsx`
- [ ] Modificar `app/page.tsx`
- [ ] Llenar `public/usuarios.json`
- [ ] Probar flujo completo
- [ ] Verificar responsividad móvil
- [ ] Revisar consistencia visual
- [ ] Documentar cambios en `cambios-explicacion.md`

---

**Última actualización**: 2026-06-22
**Versión**: 1.0
**Estado**: Guía completa lista para implementar
