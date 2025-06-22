function isAdmin(req, res, next) {
  const roles = req.userRoles;

  console.log('🔐 Roles del usuario:', roles);

  if (Array.isArray(roles) && roles.includes('admin')) {
    return next();
  }

  return res.status(403).json({ message: 'Access denied: Admins only.' });
}

module.exports = isAdmin;
