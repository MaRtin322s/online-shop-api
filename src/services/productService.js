const Product = require('../models/Product');

exports.createProduct = async ({ brand, model, imageUrl, release, designer, value, _ownerId }) => 
    await Product.create({ brand, model, imageUrl, release, designer, value, _ownerId });
exports.getAll = async () => await Product.find().lean();
exports.getOne = async (productId) => await Product.findById(productId).lean();