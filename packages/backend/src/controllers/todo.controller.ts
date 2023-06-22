import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

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

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    const todosFromDB = await this.todoService.findAll();
    res.status(200).json({ todosFromDB });
  }

  async createTodo(req: Request, res: Response) {
    const savedTodoFromDB = await this.todoService.createTodo(req.body);
    res.status(201).json({ savedTodoFromDB });
  }

  async deleteTodo(req: Request, res: Response) {
    const { todoId } = req.params;
    const result = await this.todoService.deleteTodo(todoId);
    if (result.affected === 1) {
      res.status(200).json({ message: 'todo deleted' });
    } else {
      errorChecker(null);
    }
  }

  async getTodoById(req: Request, res: Response) {
    const { todoId } = req.params;
    const todoFromDB = await this.todoService.getOneTodo(todoId);
    errorChecker(todoFromDB);
    res.status(200).json({ data: todoFromDB });
  }

  async updateTodoById(req: Request, res: Response) {
    const { todoId } = req.params;
    const updatedTodo = await this.todoService.updateTodo(todoId, req.body);
    errorChecker(updatedTodo);
    res.status(200).json({ data: updatedTodo });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
