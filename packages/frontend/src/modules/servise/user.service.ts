import { IUser, IUserLogIn } from '../common/types/student.types';
import HttpSerivce from './http.service';
import { APP_KEYS } from '../common/consts';

export class UserService extends HttpSerivce {
  getTodos() {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}`
      },
      false
    );
  }

  getTodo(id: string) {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
      },
      false
    );
  }

  deleteTodo(id: string) {
    return this.delete(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
      },
      false
    );
  }

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
}
