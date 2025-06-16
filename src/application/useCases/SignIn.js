/*
class SignIn {
  constructor(userRepository, passwordHasher, tokenGenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }
 
 
  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error('User not found');
    const isValid = await this.passwordHasher.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    const token = this.tokenGenerator.generate({ id: user._id, roles: user.roles });
    return { user, token };
  }
}
 

module.exports = SignIn;
*/

class SignIn {
  constructor(userRepository, passwordHasher, tokenGenerator) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenGenerator = tokenGenerator;
  }
 
  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error('User not found');
    const isValid = await this.passwordHasher.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    const payload = { id: user._id, roles: user.roles };
    const accessToken = this.tokenGenerator.generateAccessToken(payload);
    const refreshToken = this.tokenGenerator.generateRefreshToken(payload);

    return {
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
      accessToken,
      refreshToken,
    };
  }
}

module.exports = SignIn;
