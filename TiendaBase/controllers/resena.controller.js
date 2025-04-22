const resenaService = require('../services/resena.service');

exports.crearResena = async (req, res) => {
  try {
    const nueva = await resenaService.crearResena(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarResenas = async (_req, res) => {
  try {
    const resenas = await resenaService.listarResenas();
    res.json(resenas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
