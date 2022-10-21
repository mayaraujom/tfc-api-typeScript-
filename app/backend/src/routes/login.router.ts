import * as express from 'express';
import { loginController } from '../controllers/login.controller';

const loginRouter = express.Router();

loginRouter.post('/', loginController);

export default loginRouter;
