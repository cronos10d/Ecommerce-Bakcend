const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  creationD: { type: Date, default: Date.now },
  products: [{ type: Object, required: true }],
  address: { type: String, required: true },
  paymenMethod: { type: String, required: true },
  total: { type: Number, required: true },
  shippingDate: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);
