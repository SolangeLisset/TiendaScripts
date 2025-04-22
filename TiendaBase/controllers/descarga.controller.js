const descargaService = require('../services/descarga.service');

exports.crearDescarga = async (req, res) => {
    try {
        const nueva = await descargaService.crearDescarga(req.body);
        res.status(201).json(nueva);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listarDescargas = async (_req, res) => {
    try {
        const descargas = await descargaService.listarDescargas();
        res.json(descargas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
