import bcrypt = require('bcryptjs');
import User from '../database/models/users';
import { tokenGenerator } from '../middlewares/token.middleware';

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { message: 'Incorrect email or password' };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return { message: 'Incorrect email or password' };
  }

  const token = tokenGenerator(email);

  return { token };
};

export default loginService;
