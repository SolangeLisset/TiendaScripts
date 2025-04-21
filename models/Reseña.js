const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    script: { type: mongoose.Schema.Types.ObjectId, ref: 'Script' },
    calificacion: { type: Number, min: 1, max: 5 },
    comentario: String,
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', reseñaSchema);
