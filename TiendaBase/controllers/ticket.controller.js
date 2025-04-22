const ticketService = require('../services/ticket.service');

exports.crearTicket = async (req, res) => {
  try {
    const nuevo = await ticketService.crearTicket(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTickets = async (_req, res) => {
  try {
    const tickets = await ticketService.listarTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
