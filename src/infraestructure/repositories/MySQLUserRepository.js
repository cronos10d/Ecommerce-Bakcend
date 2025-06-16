const pool = require('../database/mysqlConnection');
 
class MySQLUserRepository {
  async create(user) {
    const { name, email, password, role } = user;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password,role) VALUES (?, ?, ?, ?)',
      [ name, email, password, role]
    );
    return { id: result.insertId, ...product };
  }
 
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }
}
 
module.exports = MySQLUserRepository;
 