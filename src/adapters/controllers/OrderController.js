class OrderController {
  constructor(repository) {
    this.repository = repository;
  }

  async create(req, res) {
    try {
      const result = await this.repository.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error('ERROR EN OrderController:', err); 
      res.status(500).json({ message: 'Error al crear orden', error: err.message });
    }
  }
  async getAll(req, res) {
    try {
      const result = await this.repository.findAll();
      res.status(200).json(result);
    } catch (err) {
      
      res.status(500).json({ message: 'Error al obtener órdenes'});
    }
  }
}

module.exports = OrderController;


