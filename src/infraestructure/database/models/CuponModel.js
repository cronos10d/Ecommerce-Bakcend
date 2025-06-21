const mongoose = require('../mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true  
});
 
 
 
module.exports = mongoose.model('Coupon', couponSchema);
 