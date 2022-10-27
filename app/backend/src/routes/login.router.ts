import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/login', loginValidation, loginController.login);
loginRouter.get('/login/validate', loginController.validToken);

export default loginRouter;
