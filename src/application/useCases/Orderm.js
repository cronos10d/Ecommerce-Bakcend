const OrderRepository = require('../repositories/OrderRepository');

class OrderUseCase {
    // Crear una nueva orden
    async createOrder(orderData) {
        try {
            const order = await OrderRepository.createOrder(orderData);
            return order;
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    // Obtener todas las órdenes de un usuario
    async getOrdersByUserId(userId) {
        try {
            const orders = await OrderRepository.getOrdersByUserId(userId);
            return orders;
        } catch (error) {
            throw new Error('Error getting orders: ' + error.message);
        }
    }

    // Obtener una orden específica
    async getOrderById(orderId) {
        try {
            const order = await OrderRepository.getOrderById(orderId);
            return order;
        } catch (error) {
            throw new Error('Error getting order: ' + error.message);
        }
    }
}

module.exports = new OrderUseCase();
