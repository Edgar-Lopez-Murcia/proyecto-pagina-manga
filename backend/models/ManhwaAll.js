const {Schema, model } = require('mongoose')


const comentarioSchema = new Schema({

    usuarioComentario: {
        type: Schema.Types.ObjetId,
        ref: 'Users',
        required: true
    },
    comentario: {type: String, required: true},
    imagen: {type: String},
    imagen: {type: String},
    imagen: {type: String},
    likes:[ {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }],
    createdAt: {
    type: Date,
    default: Date.now
    }
})

const manhwaShema = new Schema({

    codigoCorto:   { type: 'String', required: true},

    propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }, 
    tituloPrincipal: { type: String, required: true},
    tituloSecundario: [{type: String, required: true}],
    imagen: {type: String, required: true},
    descripcion: { type: String, required: true},
    formato: { type: String, 
        enum: ['Manga', 'Manhwa', 'Manhua', 'Comic', 'Novela', 'Webtoon', 'Light Novel'],
        required: true
    },
    demografia: {
        type: String,
        enum: ['Shonen', 'Shojo', 'Seinen', 'Josei', 'Kodomo', 'General'],
        required: true
    },

    Catagoria: {
        type: String,
        enum: ['Larga Estancia', 'Corta Estancia', 'Flexible'],
        required: true,
        default: 'Larga Estancia'
    },

    genero: [{
        type: String,
        enum: [
            'Accion', 'Aventura', 'Comedia', 'Romance', 'Drama', 'Tragedia',
            'Terror', 'Misterio', 'Suspenso', 'Psicologico', 'Sci-Fi', 'Fantasia',
            'Isekai', 'Cultivacion', 'Sistema', 'Wuxia', 'Slice of Life', 'Escolar',
            'Deportes', 'Mecha', 'Cyberpunk', 'Post-Apocaliptico', 'Sobrenatural',
            'Artes Marciales', 'Historial', 'Gore', 'Harem', 'Harem Inverso',
            'BL', 'GL'
        ], // etc...
        required: true
    }],

     // Ej: "Frente al parque principal, apto 201"

    estado: {
        type: String,
        enum: ['En emision', 'Pausado', 'Finalizado', 'Cancelado', 'En espera'],
        default: 'En emision',
        required: true
    },


    views: {
        type: Number,
        default: 0
    }, 
    capitulos: {type: Number},
    comentario: [comentarioSchema]


}, { timestamps : true});

const ManhwaAll = model('ManhwaAll', manhwaShema);
module.exports = ManhwaAll;