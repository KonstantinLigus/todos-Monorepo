import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { IReq } from '../types/todos.type';

type IError = Error & { status?: number };

const errorChecker = (result: object | null) => {
  if (result === null) {
    const error: IError = new Error('todo not found');
    error.status = 404;
    throw error;
  }
};

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoPublic(_: Request, res: Response) {
    const todosFromDB = await this.todoService.findAllPublic();
    res.status(200).json({ todosFromDB });
  }

  async getAllTodo(req: IReq, res: Response) {
    const userId = req.user;
    const todosFromDB = await this.todoService.findAll(userId);
    res.status(200).json({ todosFromDB });
  }

  async createTodo(req: IReq, res: Response) {
    const userId = req.user;
    const newTodo = { ...req.body, owner: userId };
    const savedTodoFromDB = await this.todoService.createTodo(newTodo);
    res.status(201).json({ savedTodoFromDB });
  }

  async deleteTodo(req: IReq, res: Response) {
    const { todoId } = req.params;
    const userId = req.user;
    const result = await this.todoService.deleteTodo(userId, todoId);
    if (result.affected === 1) {
      res.status(200).json({ message: 'todo deleted' });
    } else {
      errorChecker(null);
    }
  }

  async getTodoById(req: IReq, res: Response) {
    const { todoId } = req.params;
    const userId = req.user;
    const todoFromDB = await this.todoService.getOneTodo(userId, todoId);
    errorChecker(todoFromDB);
    res.status(200).json({ todoFromDB });
  }

  async updateTodoById(req: IReq, res: Response) {
    const { todoId } = req.params;
    const userId = req.user;
    const updatedTodo = await this.todoService.updateTodo(userId, todoId, req.body);
    errorChecker(updatedTodo);
    res.status(200).json({ updatedTodo });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
