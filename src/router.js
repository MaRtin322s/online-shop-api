const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');

router.use('/users', authController);
router.use('/data', productController);

module.exports = router;