const mongoose = require('mongoose');
const cuponSchema = require('../../infraestructure/database/models/CuponModel');
const Cupon = require('../../domain/entities/Cupon');

const CuponModel = mongoose.model('Cupon', cuponSchema);

class MongoCuponRepository {
  async create(cuponData) {
    const cuponDoc = new CuponModel(cuponData);
    const savedDoc = await cuponDoc.save();
    return new Cupon({
      id: savedDoc._id,
      codigo: savedDoc.codigo,
      descuento: savedDoc.descuento,
      fechaExpiracion: savedDoc.fechaExpiracion
    });
  }

  async findByCodigo(codigo) {
    const cuponDoc = await CuponModel.findOne({ codigo });
    if (!cuponDoc) return null;
    return new Cupon({
      id: cuponDoc._id,
      codigo: cuponDoc.codigo,
      descuento: cuponDoc.descuento,
      fechaExpiracion: cuponDoc.fechaExpiracion
    });
  }
}

module.exports = MongoCuponRepository;