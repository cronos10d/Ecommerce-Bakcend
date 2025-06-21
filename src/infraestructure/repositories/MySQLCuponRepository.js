const pool = require('../database/mysqlConnection');

class MySQLCuponRepository {
  async create(cupontEntity) {
    const code       = cupontEntity.code ;
    const discount = cupontEntity.discount;
    const expirationDate      =  cupontEntity.expirationDate;
    const timestamps      = cupontEntity.timestamps;

    const sql = `
      INSERT INTO cupons
        (code, discount, expirationDate,timestamps )
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      code,
      discount,
      expirationDate,
      timestamps
    ]);
    console.log('>>> MySQLCuponRepository.create result:', result);
    // Devuelve el objeto “similar” a lo que haría Mongo: { id, ... }
    return {
      id: result.insertId,
      code,
      discount,
      expirationDate,
      timestamps,
    };
  }
  async getAll() {
  try {
    const [rows] = await pool.execute('SELECT * FROM cupons');
    return rows;
  } catch (error) {
    console.error('Error obteniendo los cupones:', error);
    throw new Error('Error obteniendo los cupones.');
  }
}
}

module.exports = MySQLCuponRepository;