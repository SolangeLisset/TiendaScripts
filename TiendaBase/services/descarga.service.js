const { Descarga } = require('../models');

exports.crearDescarga = async (data) => {
    const descarga = new Descarga(data);
    return descarga.save();
};

exports.listarDescargas = async () => {
    return Descarga.find()
        .populate('usuario', 'username')
        .populate('script', 'nombre');
};
