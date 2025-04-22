const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  asunto: String,
  mensaje: String,
  estado: { type: String, default: 'abierto' },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
