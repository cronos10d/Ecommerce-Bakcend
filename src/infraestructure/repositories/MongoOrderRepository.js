const OrderRepository = require('../../domain/repositories/OrderRepository');
const OrderModel = require('../database/models/OrderModel');
const Order = require('../../domain/entities/Order');

class MongoOrderRepository extends OrderRepository {
  async createOrder(data) {
    const newOrder = await OrderModel.create(data);
    return new Order(newOrder.toObject());
  }

  async getAllOrders() {
    const orders = await OrderModel.find();
    return orders.map(o => new Order(o.toObject()));
  }
}

module.exports = MongoOrderRepository;