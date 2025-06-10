const db = require('../database/mysqlConnection');

function toMySQLDate(datetimeString) {
  return new Date(datetimeString).toISOString().slice(0, 19).replace('T', ' ');
}

class MySQLCartRepository {
  async create(data) {
    const { estado, creationDate, products, total, productQuantity } = data;

    const [result] = await db.query(
      'INSERT INTO carts (estado, creationDate, products, total, productQuantity) VALUES (?, ?, ?, ?, ?)',
      [
        estado,
        toMySQLDate(creationDate),             
        JSON.stringify(products),
        total,
        productQuantity
      ]
    );

    return { id: result.insertId, ...data };
  }

  async findAll() {
    const [rows] = await db.query('SELECT * FROM carts');
    return rows.map(row => ({
      ...row,
      products: JSON.parse(row.products)
    }));
  }
}

module.exports = MySQLCartRepository;
