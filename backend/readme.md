# 📌 Arquitectura del Backend y Notas de Desarrollo (Publicaciones, Likes y Vistas)

Este documento contiene las reglas de negocio, buenas prácticas de optimización y la estructura de datos que se deben implementar al momento de desarrollar las **rutas y controladores** del backend.

---

## 🎨 1. Sistema de Vistas (Visualizaciones)

### ¿Cómo funciona?
Las vistas **se guardan físicamente en la base de datos** dentro del modelo de la publicación como un campo numérico (`views: { type: Number, default: 0 }`). No se calculan, se van acumulando.

### Consideraciones para el Controlador:
* **Optimización con Mongoose:** Para evitar descargar todo el documento del manga de la base de datos solo para sumar una vista, se debe utilizar el operador `$inc` de MongoDB. Esto hace la operación directamente en el motor de la base de datos y es extremadamente rápido.
* **Control de Spam (Opcional para el futuro):** Si se quiere evitar que un usuario altere las vistas simplemente refrescando la página (`F5`), se puede implementar un sistema con *cookies*, *localStorage* en el frontend, o guardar temporalmente en la sesión/IP si ya vio esa publicación en las últimas 24 horas.

**Código de ejemplo para el controlador:**
```javascript
// Al entrar al detalle de un manga, solo incrementamos el contador
await Publication.findByIdAndUpdate(mangaId, { $inc: { views: 1 } });
```

---

## 🖤 2. Sistema de Likes (Manga principal vs. Comentarios)

Para mantener la base de datos ligera y evitar que los documentos de las publicaciones superen el límite de tamaño de MongoDB (16MB), dividimos la lógica de los likes en dos estrategias diferentes:

### A. Likes de la Publicación Principal (Colección Separada)
Los mangas pueden recibir miles de likes. Guardar los IDs de todos los usuarios dentro del mismo manga ralentizaría la aplicación. Por ende, se utiliza una **colección independiente llamada `Like`**.

* **Para dar/quitar like:** Se crea o destruye un documento con el `userId` y `publicationId`.
* **Para el Frontend (Corazón Rojo):** El controlador debe verificar si existe un registro que coincida con el usuario logueado y el manga actual. Si existe, se manda un flag `hasLiked: true` para pintar el corazón de rojo.
* **Para contar los likes:** Se usa `Like.countDocuments({ publicationId: mangaId })`.

### B. Likes de los Comentarios (Array Embebido)
Como los comentarios rara vez reciben volúmenes masivos de likes individuales, es seguro guardar los IDs de los usuarios directamente en un array dentro del sub-esquema del comentario.

* **Para el Frontend:** En el frontend, se mapean los comentarios y se comprueba si el ID del usuario logueado está incluido en el array de likes del comentario (`comentario.likes.includes(userId)`). Si es así, se pinta en rojo.

---

## 🚦 3. Estados de Publicación (`status`)

Al crear o editar una obra, el editor debe seleccionar el estado actual del proyecto. En la base de datos se maneja mediante un `enum` con los siguientes valores estándar:

* `En emision`: El proyecto está activo y recibiendo capítulos.
* `Pausado`: Detenido temporalmente.
* `Finalizado`: La obra terminó por completo.
* `Cancelado`: Suspendido definitivamente.
* `En espera`: En pausa entre temporadas (Hiatus).

**Tip para el Frontend:** Utilizar estos strings exactos para pintar etiquetas dinámicas de colores (Verde para emisión, Rojo para cancelado, Azul para finalizado, etc.).

---

## 🛠️ 4. Estructura de los Modelos de Mongoose Relacionados

A continuación se detalla cómo deben quedar estructurados los archivos en la carpeta `models`:

### `models/Like.js`
```javascript
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication',
    required: true
  }
}, { timestamps: true });

// Índice único compuesto: evita que un usuario le dé like más de una vez al mismo manga
likeSchema.index({ userId: 1, publicationId: 1 }, { unique: true });

export const Like = mongoose.model('Like', likeSchema);
```

### Lógica del Controlador de Likes (Manga Principal)
```javascript
// Ejemplo de lógica "Toggle" (Dar/Quitar Like) para el controlador
const { publicationId } = req.params;
const userId = req.user.id; // Proviene del middleware de autenticación

const yaExiste = await Like.findOne({ userId, publicationId });

if (yaExiste) {
  // Si ya existe, significa que quiere quitar el like
  await Like.findByIdAndDelete(yaExiste._id);
  return res.json({ liked: false, message: "Like retirado" });
} else {
  // Si no existe, creamos el registro del nuevo like
  await Like.create({ userId, publicationId });
  return res.json({ liked: true, message: "Like agregado" });
}
````

##🧠 ¿Cómo funciona esto en la práctica?
1. Cuando el usuario da like: Creas un documento en esta colección guardando su userId y el publicationId del manga.

2. Para saber cuántos likes tiene un manga: En tu backend, haces un conteo rápido (que es súper eficiente en MongoDB):
````javascript
const totalLikes = await Like.countDocuments({ publicationId: mangaId });
Usa el código con precaución.````
3. Para saber si el usuario actual le dio like (y pintar el corazón rojo): Buscas si existe el registro:
````javascript
const leDioLike = await Like.findOne({ userId: usuarioLogueadoId, publicationId: mangaId });
// Si leDioLike no es null, el corazón en el frontend se pinta rojo.