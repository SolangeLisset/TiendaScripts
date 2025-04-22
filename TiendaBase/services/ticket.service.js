const { Ticket } = require('../models');

exports.crearTicket = async (data) => {
  const ticket = new Ticket(data);
  return ticket.save();
};

exports.listarTickets = async () => {
  return Ticket.find().populate('usuario', 'username email');
};
