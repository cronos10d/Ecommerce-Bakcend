const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  estado: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  products: [{ type: Object, required: true }],
  total: { type: Number, required: true },
  productQuantity: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);

