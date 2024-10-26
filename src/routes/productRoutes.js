const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', productController.listProducts);
router.get('/:productId', productController.getProduct);
router.post('/', adminAuth, productController.createProduct);
router.put('/:productId', adminAuth, productController.updateProduct);
router.delete('/:productId', adminAuth, productController.deleteProduct);

module.exports = router;