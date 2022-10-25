import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './token.middleware';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = verifyToken(token);
    req.body.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default tokenValidation;
