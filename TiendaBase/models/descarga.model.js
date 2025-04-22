const mongoose = require('mongoose');

const descargaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  script: { type: mongoose.Schema.Types.ObjectId, ref: 'Script' },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Descarga', descargaSchema);
