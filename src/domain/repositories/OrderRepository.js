const Order = require('../models/Order'); 

class OrderRepository {
    // Crear una nueva orden
    async createOrder(orderData) {
        try {
            const newOrder = new Order(orderData);
            return await newOrder.save();  // Guardar la nueva orden en la base de datos
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    // Obtener todas las órdenes de un usuario (por ejemplo)
    async getOrdersByUserId(userId) {
        try {
            const orders = await Order.find({ userId });  
            return orders;
        } catch (error) {
            throw new Error('Error getting orders: ' + error.message);
        }
    }

    // Obtener una orden específica por su ID
    async getOrderById(orderId) {
        try {
            const order = await Order.findById(orderId);
            return order;
        } catch (error) {
            throw new Error('Error getting order: ' + error.message);
        }
    }
}

module.exports = new OrderRepository();
