import * as bcryptjs from 'bcryptjs';
import ILoginResponse from '../interfaces/ILoginResponse';
import Users from '../database/models/users.model';
import IUserLogin from '../interfaces/IUserLogin';
import { tokenGenerator } from '../helpers/JWT';

class LoginService {
  private userModel;

  constructor() {
    this.userModel = Users;
  }

  public login = async (body: IUserLogin): Promise<ILoginResponse> => {
    const { email, password } = body;
    const findUser = await Users.findOne({ where: { email } });
    if (findUser && bcryptjs.compareSync(password, findUser.password)) {
      const payload = {
        id: findUser.id,
        role: findUser.role,
      };
      const token = tokenGenerator(payload);
      return { status: 200, token };
    }
    return { status: 401, message: 'Incorrect email or password' };
  };
}

export default LoginService;
