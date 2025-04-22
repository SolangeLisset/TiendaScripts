const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const scriptRoutes = require('./script.routes');
const ticketRoutes = require('./ticket.routes');
const resenaRoutes = require('./resena.routes');
const categoriaRoutes = require('./categoria.routes');
const descargaRoutes = require('./descarga.routes');

router.use('/auth', authRoutes);
router.use('/scripts', scriptRoutes);
router.use('/tickets', ticketRoutes);
router.use('/resenas', resenaRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/descargas', descargaRoutes);

module.exports = router;
