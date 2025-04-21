const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['policial', 'medico', 'economia', 'bandas', 'otros'] },
    version: { type: String, default: '1.0.0' },
    requirements: [String],
    downloads: { type: Number, default: 0 },
    images: [String],
    documentation: String,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);