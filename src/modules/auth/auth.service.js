const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../users/user.repository');

class AuthService {
  async register(data) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'AUTHOR',
    });

    return user;
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
        
        tokenType: 'Bearer',
        token,
      user,
      
    };
  }
}

module.exports = new AuthService();