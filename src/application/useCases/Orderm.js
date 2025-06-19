class OrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(orderData) {
    try {
      const order = await this.orderRepository.createOrder(orderData);
      return order;
    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
  }

  async getOrdersByUserId(userId) {
    try {
      const orders = await this.orderRepository.getOrdersByUserId(userId);
      return orders;
    } catch (error) {
      throw new Error('Error getting orders: ' + error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.orderRepository.getOrderById(orderId);
      return order;
    } catch (error) {
      throw new Error('Error getting order: ' + error.message);
    }
  }
}

module.exports = OrderUseCase;

