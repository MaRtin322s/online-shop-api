const router = require('express').Router();
const productService = require('../services/productService');

router.post('/products', async (req, res) => {
    const data = { brand, model, imageUrl, release, designer, value } = req.body;

    if (Object.values(data).some(x => x == '')) {
        res.json({ message: 'All fields are required'});
    } else {
        const product = await productService.createProduct(data);
        res.json(product);
    }
});

router.get('/products', async (req, res) => {
    const allProducts = await productService.getAll();
    console.log(allProducts); 
});

module.exports = router;