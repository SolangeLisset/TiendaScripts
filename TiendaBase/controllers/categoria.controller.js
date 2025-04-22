const categoriaService = require('../services/categoria.service');

exports.crearCategoria = async (req, res) => {
    try {
        const nueva = await categoriaService.crearCategoria(req.body);
        res.status(201).json(nueva);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listarCategorias = async (_req, res) => {
    try {
        const categorias = await categoriaService.listarCategorias();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
