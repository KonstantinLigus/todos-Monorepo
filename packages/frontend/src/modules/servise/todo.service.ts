import { ITodo } from '../common/types/student.types';
import HttpSerivce from './http.service';
import { APP_KEYS } from '../common/consts';

export class TodoService extends HttpSerivce {
  getTodos() {
    return this.get({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}`
    });
  }

  getTodo(id: string) {
    return this.get({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
    });
  }

  deleteTodo(id: string) {
    return this.delete({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`
    });
  }

  putTodo(id: string, todo: ITodo) {
    return this.put({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id}`,
      data: todo
    });
  }

  postTodo(todo: ITodo) {
    return this.post({
      url: `${APP_KEYS.BACKEND_KEYS.TODOS}`,
      data: todo
    });
  }
}
