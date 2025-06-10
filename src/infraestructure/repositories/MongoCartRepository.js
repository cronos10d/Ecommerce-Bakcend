const CartRepository = require('../../domain/repositories/CartRepository');
const CartModel = require('../database/models/CartModel');
const Cart = require('../../domain/entities/Cart');

class MongoCartRepository extends CartRepository {
  async createCart(data) {
    const newCart = await CartModel.create(data);
    return new Cart(newCart.toObject());
  }

  async getAllCarts() {
    const carts = await CartModel.find();
    return carts.map(c => new Cart(c.toObject()));
  }
}

module.exports = MongoCartRepository;
