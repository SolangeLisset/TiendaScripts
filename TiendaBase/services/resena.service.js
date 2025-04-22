const { Reseña } = require('../models');

exports.crearResena = async (data) => {
  const resena = new Reseña(data);
  return resena.save();
};

exports.listarResenas = async () => {
  return Reseña.find()
    .populate('autor', 'username')
    .populate('script', 'nombre');
};
