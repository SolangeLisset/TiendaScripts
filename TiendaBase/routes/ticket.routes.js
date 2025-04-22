const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.get('/', ticketController.listarTickets);
router.post('/', ticketController.crearTicket);

module.exports = router;
