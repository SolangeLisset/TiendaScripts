const Script = require('../models/script');

const addScript = async (req, res) => {
    const { title, description, price, userId } = req.body;
    const newScript = new Script({ title, description, price, userId });

    try {
        await newScript.save();
        res.status(201).json({ message: 'Script añadido con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error al añadir script' });
    }
};

const getScripts = async (req, res) => {
    try {
        const scripts = await Script.find();
        res.status(200).json(scripts);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener scripts' });
    }
};

module.exports = { addScript, getScripts };
