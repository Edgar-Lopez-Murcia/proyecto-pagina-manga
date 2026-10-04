import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication', // Reemplaza por el nombre exacto de tu modelo de Mangas/Manhwas
        required: true
    },
    // Tipo de contenido para diferenciar capítulos reales de notas de los autores
    contentType: {
        type: String,
        enum: ['Capitulo', 'Aviso', 'Extra', 'Especial'],
        default: 'Capitulo',
        required: true
    },
    // El número solo es obligatorio si es un 'Capitulo' o 'Extra' numérico
    number: {
        type: Number,
        required: function() { return this.contentType === 'Capitulo'; }
    },
    title: {
        type: String, // Ejemplo: "El despertar", o si es aviso: "Pausa por salud del autor"
        required: true
    },
    // Array con las URLs de las imágenes del manga (vacío si es solo un aviso de texto)
    imagenes: [{
        type: String
    }],
    // Texto opcional en caso de que sea un Aviso
    noticeText: {
        type: String
    }
}, { timestamps: true });

// Índice para asegurar que no se repita el mismo número de capítulo en un mismo manga
chapterSchema.index({ publicationId: 1, number: 1 }, { unique: true, partialFilterExpression: { contentType: 'Capitulo' } });

export const Chapter = mongoose.model('Chapter', chapterSchema);
