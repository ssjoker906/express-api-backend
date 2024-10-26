const Review = require('../models/Review');
const Product = require('../models/Product');

exports.listReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const review = new Review({
      ...req.body,
      productId: req.params.productId,
      userId: req.user.userId
    });
    await review.save();

    // Update product average rating
    const reviews = await Review.find({ productId: req.params.productId });
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.params.productId, { averageRating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.reviewId,
      userId: req.user.userId,
      productId: req.params.productId
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    Object.assign(review, req.body);
    review.updatedAt = new Date();
    await review.save();

    // Update product average rating
    const reviews = await Review.find({ productId: req.params.productId });
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.params.productId, { averageRating: avgRating });

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      userId: req.user.userId,
      productId: req.params.productId
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update product average rating
    const reviews = await Review.find({ productId: req.params.productId });
    const avgRating = reviews.length > 0
      ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
      : 0;
    await Product.findByIdAndUpdate(req.params.productId, { averageRating: avgRating });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};