import { IUser, IUserLogIn } from '../common/types/student.types';
import HttpSerivce from './http.service';
import { APP_KEYS } from '../common/consts';

export class UserService extends HttpSerivce {
  postLoginUser(user: IUserLogIn) {
    return this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER_LOGIN}`,
        data: user
      },
      false
    );
  }

  postNewUser(user: IUser) {
    return this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER_REGISTER}`,
        data: user
      },
      true
    );
  }

  refreshUser() {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.USER_REFRESH}`
      },
      true
    );
  }
}
