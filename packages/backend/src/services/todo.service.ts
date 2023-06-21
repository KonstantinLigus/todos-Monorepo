import { Todo } from '../entities/Todo';
import { ICreateTodo } from '../types/todos.type';
import dataSource from '../config/datasourse';

export default class TodoService {
  async findAll() {
    const allTodosFromDB = await dataSource.manager.find(Todo);
    return allTodosFromDB;
  }

  async createTodo(todoReq: ICreateTodo) {
    const todo = new Todo();
    todo.title = todoReq.title;
    todo.description = todoReq.description;
    todo.isComplete = todoReq.isComplete;
    todo.isPrivate = todoReq.isPrivate;
    const savedTodoFromDB = await dataSource.manager.save(todo);
    return savedTodoFromDB;
  }

  async deleteTodo(id: string) {
    const deletedTodo = await dataSource.manager.delete(Todo, id);
    return deletedTodo;
  }

  async getOneTodo(id: string) {
    const todoFromDB = await dataSource.manager.findOneBy(Todo, { id });
    return todoFromDB;
  }
}
