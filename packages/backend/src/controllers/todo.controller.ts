import { Response, Request } from 'express';
import TodoService from '../services/todo.service';
import { IError, IReq } from '../types/todos.type';

const errorChecker = (result: object | null) => {
  if (result === null) {
    const error: IError = new Error('todo not found');
    error.status = 404;
    throw error;
  }
};

class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodoPublic(_: Request, res: Response) {
    const todosFromDB = await this.todoService.findAllPublic();
    res.status(200).json({ todosFromDB });
  }

  async getTodos(req: IReq, res: Response) {
    const userId = req.user;
    const { filters } = req;
    let { page, perPage } = req.query;
    let pages = 1;
    let todosFromDB = null;

    if (perPage && +perPage > 0 && page && +page > 0) {
      page = Math.round(+page);
      perPage = Math.round(+perPage);

      todosFromDB = await this.todoService.findTodos({
        userId,
        filters,
        skip: (page - 1) * perPage,
        take: perPage
      });
      const todosAmount = await this.todoService.countTodos({ owner: userId, filters });
      pages = todosAmount === 0 ? 1 : Math.ceil(todosAmount / perPage);
    }
    if (!perPage && !page) {
      todosFromDB = await this.todoService.findTodos({
        userId,
        filters
      });
      page = 1;
    }
    res.status(200).json({ todosFromDB, page, pages });
  }

  async getFilter(req: IReq, res: Response) {
    const userId = req.user;
    const filterFromDB = await this.todoService.getFilter(userId);
    res.status(200).json({ filterFromDB });
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
