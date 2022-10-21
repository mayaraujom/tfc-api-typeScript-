import { Request, Response } from 'express';
import { loginService } from '../services/login.service';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);
  const { token, message } = user;
  if (message) {
    return res.status(401).json(message);
  }
  return res.status(200).json(token);
};

export default loginController;
