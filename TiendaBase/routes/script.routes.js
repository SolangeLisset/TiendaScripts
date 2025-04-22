const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/script.controller');

router.get('/', scriptController.getScripts);
router.post('/', scriptController.addScript);

module.exports = router;
