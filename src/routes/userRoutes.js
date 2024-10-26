const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/addresses', auth, userController.listAddresses);
router.post('/addresses', auth, userController.addAddress);
router.put('/addresses/:addressId', auth, userController.updateAddress);
router.delete('/addresses/:addressId', auth, userController.deleteAddress);

module.exports = router;