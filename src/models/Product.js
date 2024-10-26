const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  animalType: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }],
  specifications: {
    weight: String,
    dimensions: String,
    material: String
  },
  tags: [String],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);