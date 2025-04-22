const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  script: { type: mongoose.Schema.Types.ObjectId, ref: 'Script' },
  contenido: String,
  calificacion: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', resenaSchema);
