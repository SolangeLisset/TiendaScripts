const scriptService = require('../services/script.service');

exports.getScripts = async (_req, res) => {
    try {
        const scripts = await scriptService.getAll();
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addScript = async (req, res) => {
    try {
        const nuevo = await scriptService.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
