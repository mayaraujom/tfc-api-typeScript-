import { Request, Response } from 'express';
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
}
