class CartController {
  constructor(repository) {
    this.repository = repository;
  }

  async create(req, res) {
  try {
    const cart = await this.cartRepository.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    console.error(' Error al crear carrito:', error); 
    res.status(500).json({
      message: 'Error al crear carrito',
      error: error.message || error
    });
  }
}

  async getAll(req, res) {
    try {
      const result = await this.repository.findAll();
      res.status(200).json(result);
    } catch (err) {
      console.error('Error en getAll carts:', err);
      res.status(500).json({ message: 'Error al obtener carritos', err });
    }
  }
}

module.exports = CartController;
