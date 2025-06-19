const Cupon = require('../../domain/entities/Cupon');
 
class cupon {
  constructor(cuponRepository) {
    this.cuponRepository = cuponRepository;
  }
 
  async execute(productData) {
    const cupon = new Cupon(productData);
    return await this.cuponRepository.create(cupon);
  }
}
 
module.exports = cupon;
 