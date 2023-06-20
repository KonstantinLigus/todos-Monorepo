import { Response, Request } from 'express';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    const todosFromDB = await this.todoService.findAll();
    res.status(200).send(todosFromDB);
  }

  async createTodo(req: Request, res: Response) {
    const savedTodoFromDB = await this.todoService.createTodo(req.body);
    res.status(201).send(savedTodoFromDB);
  }

  async deleteTodo(req: Request, res: Response) {
    const id = Number(req.body.id);
    const deletedTodoFromDB = await this.todoService.deleteTodo(id);
    res.status(200).send(deletedTodoFromDB);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
