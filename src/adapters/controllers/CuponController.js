class CuponController {
  constructor(crearCuponUseCase) {
    this.crearCupon = crearCuponUseCase;
  }

  async create(req, res) {
    try {
      const cupon = await this.crearCupon.execute(req.body);
      res.status(201).json(cupon);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = CuponController;