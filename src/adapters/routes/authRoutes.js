const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

module.exports = (signInUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase);

  // POST /api/v1/auth/signin
  router.post('/signin', controller.signIn.bind(controller));

  // NUEVA RUTA: POST /api/v1/auth/refresh
  router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    const tokenGen = signInUseCase.tokenGenerator;

    if (!refreshToken || !tokenGen.isValidRefreshToken(refreshToken)) {
      return res.status(403).json({ message: 'Refresh token inválido o no autorizado' });
    }

    try {
      const decoded = tokenGen.verifyRefreshToken(refreshToken);
      const newAccessToken = tokenGen.generateAccessToken({
        id: decoded.id,
        roles: decoded.roles,
      });
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: 'Refresh token expirado o inválido' });
    }
  });

  return router;
};
