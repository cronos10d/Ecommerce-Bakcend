const OrderUseCase = require('../../application/useCases/Orderm');

class OrderController {
  constructor(orderRepository) {
    this.useCase = new OrderUseCase(orderRepository);
  }

  async create(req, res) {
    try {
      const result = await this.useCase.createOrder(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error('ERROR EN OrderController:', err); 
      res.status(500).json({ message: 'Error al crear orden', error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.useCase.getAllOrders?.(); // si existe
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener órdenes', error: err.message });
    }
  }
}

module.exports = OrderController;
