/*
const UserModel = require('../database/models/User');
 
class MongoUserRepository {
  async findByUsername(username) {
    return UserModel.findOne({ username }).lean().exec();
  }
 
   /**
   * Crea y guarda un nuevo usuario en Mongo.
   * @param {{ username: string, password: string, roles?: string[] }} userData
   * @returns {Promise<Object>} documento creado en la base de datos
   * @throws {Error} si ocurre un error al guardar el usuario
   */
  /*
  async create({ username, password, roles = ['user'] }) {
    const user = new UserModel({ username, password, roles });
    return user.save();
  }
 
}
 
module.exports = MongoUserRepository;
*/

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },      // passwordHashed
  roles:    { type: [String], default: ['user'] }
}, { timestamps: true });

module.exports = model('User', userSchema);

