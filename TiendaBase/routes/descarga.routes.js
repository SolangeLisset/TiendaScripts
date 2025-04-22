const express = require('express');
const router = express.Router();
const descargaController = require('../controllers/descarga.controller');

router.get('/', descargaController.listarDescargas);
router.post('/', descargaController.crearDescarga);

module.exports = router;
