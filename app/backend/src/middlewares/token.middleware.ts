import * as jwt from 'jsonwebtoken';

const { JWT_SECRET = 'jwt_secret' } = process.env;

export const tokenGenerator = (email: string) => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);

  return token;
};

export default { tokenGenerator };
