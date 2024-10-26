const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { adminAuth } = require('../middleware/auth');

router.get('/', categoryController.listCategories);
router.get('/:categoryId', categoryController.getCategory);
router.post('/', adminAuth, categoryController.createCategory);
router.put('/:categoryId', adminAuth, categoryController.updateCategory);
router.delete('/:categoryId', adminAuth, categoryController.deleteCategory);

module.exports = router;