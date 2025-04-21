const mongoose = require('mongoose');

// Esquema de Scripts
const scriptSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
    stock: Number,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    archivoUrl: String,
    imagenUrl: String,
    fechaPublicacion: { type: Date, default: Date.now },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

// Modelo Script
const Script = mongoose.model('Script', scriptSchema);

module.exports = Script;  
