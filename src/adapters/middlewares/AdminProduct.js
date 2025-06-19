function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const roles = req.userRoles;
 
    if (!roles) {
      return res.status(401).json({ message: 'No autenticado' });
    }
 
    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: `Requiere rol: ${requiredRole}` });
    }
 
    next();
  };
}
 
module.exports = authorizeRole;