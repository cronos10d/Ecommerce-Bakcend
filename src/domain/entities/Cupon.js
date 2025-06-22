class Cupon {
  constructor({ id, codigo, descuento, fechaExpiracion }) {
    this.id = id;
    this.codigo = codigo;
    this.descuento = descuento;
    this.fechaExpiracion = fechaExpiracion;
  }

  estaExpirado() {
    return new Date() > new Date(this.fechaExpiracion);
  }
}

module.exports = Cupon;
