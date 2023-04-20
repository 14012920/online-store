const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: String,
    price: Number,
    userId: String,
    products: { type: Array, default: [] },
    address: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
