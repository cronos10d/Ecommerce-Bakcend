const CuponRepository = require('../../domain/repositories/CuponRepository');
const CuponModel = require('../database/models/CuponModel');
const Cupon = require('../../domain/entities/Cupon');

class MongoCuponRepository extends CuponRepository {
  async getAll() {
    const cupons = await CuponModel.find();
    console.log('Products retrieved from MongoDB:', cupons);
    return cupons.map(p => new Cupon(p.toObject()));
  }

  async create(cupon) {
    const newCupon = await ProductModel.create(cupon);
    return new Cupon(newCupon.toObject());
  }
}

module.exports = MongoCuponRepository;