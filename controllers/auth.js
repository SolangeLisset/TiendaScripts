const User = require('../models/User');
const { generateToken } = require('../config/auth');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const user = new User({ username, email, password });
        await user.save();

        // Generar token
        const token = generateToken(user);

        res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken(user);
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                role: user.role 
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};