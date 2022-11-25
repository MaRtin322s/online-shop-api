const Product = require('../models/Product');

exports.createProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
}
exports.getAll = async () => await Product.find().lean();