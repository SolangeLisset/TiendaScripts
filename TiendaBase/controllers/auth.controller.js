const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await authService.login(req.body.email, req.body.password);
        req.session.userId = user._id;
        res.json({ message: 'Login exitoso', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
