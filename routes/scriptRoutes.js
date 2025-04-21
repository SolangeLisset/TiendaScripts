const express = require('express');
const { addScript, getScripts } = require('../controllers/scriptController');
const router = express.Router();

router.post('/', addScript);  // Ruta para añadir un script
router.get('/', getScripts);  // Ruta para obtener los scripts

module.exports = router;
