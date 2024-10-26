const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { auth } = require('../middleware/auth');

router.get('/', auth, petController.listPets);
router.post('/', auth, petController.addPet);
router.put('/:petId', auth, petController.updatePet);
router.delete('/:petId', auth, petController.deletePet);

module.exports = router;