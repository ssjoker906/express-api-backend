const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

router.get('/', reviewController.listReviews);
router.post('/', auth, reviewController.addReview);
router.put('/:reviewId', auth, reviewController.updateReview);
router.delete('/:reviewId', auth, reviewController.deleteReview);

module.exports = router;