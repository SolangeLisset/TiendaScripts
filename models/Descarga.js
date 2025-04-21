const mongoose = require('mongoose');

const descargaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    script: { type: mongoose.Schema.Types.ObjectId, ref: 'Script' },
    fechaDescarga: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Descarga', descargaSchema);
