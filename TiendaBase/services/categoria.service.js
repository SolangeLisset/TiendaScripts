const { Categoria } = require('../models');

exports.crearCategoria = async (data) => {
    const categoria = new Categoria(data);
    return categoria.save();
};

exports.listarCategorias = async () => {
    return Categoria.find();
};
