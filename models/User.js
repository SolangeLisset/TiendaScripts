const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definir el esquema para el modelo User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Validación básica de email
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: String,
        enum: ['cliente', 'soporte', 'administrador'],
        default: 'cliente'  // El rol predeterminado es 'cliente'
    }
});

// Método para cifrar la contraseña antes de guardar al usuario
userSchema.methods.hashPassword = async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Crear el modelo User con el esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User;
