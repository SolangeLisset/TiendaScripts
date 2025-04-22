const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: 'cliente' }
});

userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (plainText) {
    return await bcrypt.compare(plainText, this.password);
};

module.exports = mongoose.model('User', userSchema);
