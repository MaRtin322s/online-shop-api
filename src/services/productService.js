const Product = require('../models/Product');

exports.createProduct = async ({ brand, model, imageUrl, release, designer, value }) => 
    await Product.create({ brand, model, imageUrl, release, designer, value });
exports.getAll = async () => await Product.find().lean();