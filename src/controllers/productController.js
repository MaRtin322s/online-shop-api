const router = require('express').Router();
const productService = require('../services/productService');

router.post('/products', async (req, res) => {
    const data = { brand, model, imageUrl, release, designer, value } = req.body;
    const _ownerId = req.user;

    if (Object.values(data).some(x => x == '')) {
        res.json({ message: 'All fields are required'});
    } else {
        const product = await productService.createProduct({
            brand,
            model,
            imageUrl,
            release,
            designer,
            value,
            _ownerId
        });
        res.json(product);
    }
});

router.get('/products', async (req, res) => {
    const allProducts = await productService.getAll();
    res.json(allProducts); 
});

router.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await productService.getOne(productId);
    res.json(product); 
});

router.put('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const _ownerId = req.user;
    const prodcutData = req.body;
    const edittedProduct = await productService.editProduct(productId, {... prodcutData, _ownerId });
    res.json(edittedProduct);
});

module.exports = router;