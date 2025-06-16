const jwt = require('jsonwebtoken');
const SECRET = 'tu_secreto_super_seguro';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    req.user = user; // Guarda info del token en el request
    next();
  });
}

module.exports = authenticateToken;
