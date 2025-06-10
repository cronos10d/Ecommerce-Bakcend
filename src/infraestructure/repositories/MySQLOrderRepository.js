const db = require('../database/mysqlConnection');

function toMySQLDate(datetimeString) {
  return new Date(datetimeString).toISOString().slice(0, 19).replace('T', ' ');
}

class MySQLOrderRepository {
  async create(data) {
    const { creationD, products, address, paymenMethod, total, shippingDate } = data;

    const [result] = await db.query(
      'INSERT INTO orders (creationD, products, address, paymenMethod, total, shippingDate) VALUES (?, ?, ?, ?, ?, ?)',
      [
        toMySQLDate(creationD),                
        JSON.stringify(products),              
        address,
        paymenMethod,
        total,
        toMySQLDate(shippingDate)              
      ]
    );

    return { id: result.insertId, ...data };
  }

  async findAll() {
    const [rows] = await db.query('SELECT * FROM orders');
    return rows.map(row => ({
      ...row,
      products: JSON.parse(row.products)      
    }));
  }
}

module.exports = MySQLOrderRepository;
