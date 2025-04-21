const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key_placeholder',
  
  generateToken: (user) => {
    return jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );
  },
  
  verifyToken: (token) => {
    return jwt.verify(token, this.JWT_SECRET);
  }
};