const { User } = require('../models');

exports.register = async (data) => {
    const user = new User(data);
    await user.hashPassword();
    return user.save();
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');
    const valid = await user.comparePassword(password);
    if (!valid) throw new Error('Contraseña incorrecta');
    return user;
};
