import { ITodo } from '../common/types/student.types';
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

  putTodo(id: string, todo: ITodo) {
    return this.put(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`,
        data: todo
      },
      false
    );
  }

  postTodo(todo: ITodo) {
    return this.post(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}`,
        data: todo
      },
      false
    );
  }
}
