import { Request, Response } from 'express';
import { verifyToken } from '../middlewares/token.middleware';
import LoginService from '../services/LoginService';

export default class LoginController {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const response = await this._loginService.login(req.body);
    const { status, message, token } = response;
    if (!token) {
      return res.status(status).json({ message });
    }
    return res.status(status).json({ token });
  };

  public validToken = (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = verifyToken(authorization);

    return res.status(200).json(decoded);
  };
}
