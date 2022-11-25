const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    designer: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;