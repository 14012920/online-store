const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    image: String,
    details: String,
    ratings: Number,
    qty: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
