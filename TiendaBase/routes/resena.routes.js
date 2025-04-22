const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resena.controller');

router.get('/', resenaController.listarResenas);
router.post('/', resenaController.crearResena);

module.exports = router;
