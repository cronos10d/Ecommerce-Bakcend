/*
const jwt = require('jsonwebtoken');
const config = require('../../config');
 
class TokenGenerator {
  generate(payload) {
    return jwt.sign(
      { id: payload.id, roles: payload.roles },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
  }
}
 
module.exports = TokenGenerator;
*/

const jwt = require('jsonwebtoken');
const config = require('../../config');

class TokenGenerator {
  constructor() {
    this.refreshTokens = [];
  }

  generateAccessToken(payload) {
    return jwt.sign(
      { id: payload.id, roles: payload.roles },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  generateRefreshToken(payload) {
    const token = jwt.sign(
      { id: payload.id, roles: payload.roles },
      config.jwtRefreshSecret
    );
    this.refreshTokens.push(token);
    return token;
  }

  verifyAccessToken(token) {
    return jwt.verify(token, config.jwtSecret);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, config.jwtRefreshSecret);
  }

  isValidRefreshToken(token) {
    return this.refreshTokens.includes(token);
  }
}

module.exports = TokenGenerator;
