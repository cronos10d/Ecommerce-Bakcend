class AuthController {
  constructor(signInUseCase) {
    this.signInUseCase = signInUseCase;
  }
 
  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refreshToken } = await this.signInUseCase.execute({ username, password });
      delete user.password;
      res.json({ user, accessToken, refreshToken }); 
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}
 
module.exports = AuthController;