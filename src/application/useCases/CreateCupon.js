class CrearCupon {
  constructor(cuponRepository) {
    this.cuponRepository = cuponRepository;
  }

  async execute(cuponData) {
    if (!cuponData.codigo) throw new Error('El código del cupón es obligatorio');
    if (!cuponData.descuento || cuponData.descuento <= 0) throw new Error('Descuento inválido');
    if (!cuponData.fechaExpiracion || new Date(cuponData.fechaExpiracion) <= new Date())
      throw new Error('Fecha de expiración inválida');

    const existente = await this.cuponRepository.findByCodigo(cuponData.codigo);
    if (existente) throw new Error('El código del cupón ya existe');

    return this.cuponRepository.create(cuponData);
  }
}

module.exports = CrearCupon;