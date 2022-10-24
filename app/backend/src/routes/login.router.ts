import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/login', loginController.login);

export default loginRouter;
