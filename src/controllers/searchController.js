const Product = require('../models/Product');
const Category = require('../models/Category');

exports.search = async (req, res) => {
  try {
    const {
      q,
      type = 'products',
      category,
      animalType,
      minPrice,
      maxPrice,
      brand,
      rating,
      sortField = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    let query = {};
    let results;
    let count;

    // Build search query
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (type === 'products') {
      // Add product-specific filters
      if (category) query.category = category;
      if (animalType) query.animalType = animalType;
      if (brand) query.brand = brand;
      if (rating) query.averageRating = { $gte: parseFloat(rating) };
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      // Execute product search
      results = await Product.find(query)
        .sort({ [sortField]: sortOrder === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('category');

      count = await Product.countDocuments(query);
    } else if (type === 'categories') {
      // Execute category search
      results = await Category.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      count = await Category.countDocuments(query);
    }

    res.json({
      results,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalResults: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};