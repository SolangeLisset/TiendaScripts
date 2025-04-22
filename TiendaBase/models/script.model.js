const mongoose = require('mongoose');

const scriptSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    autor: String,
    estado: { type: String, default: 'activo' }
});

module.exports = mongoose.model('Script', scriptSchema);
