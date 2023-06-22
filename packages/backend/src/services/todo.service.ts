import { Todo } from '../entities/Todo';
import dataSource from '../config/datasourse';
import { ICreateUpdateTodo } from '../types/todos.type';

export default class TodoService {
  async findAll() {
    const allTodosFromDB = await dataSource.manager.find(Todo);
    return allTodosFromDB;
  }

  async createTodo(todoReq: ICreateUpdateTodo) {
    const todo = new Todo();
    todo.title = todoReq.title;
    todo.description = todoReq.description;
    todo.isComplete = todoReq.isComplete;
    todo.isPrivate = todoReq.isPrivate;
    const savedTodoFromDB = await dataSource.manager.save(todo);
    return savedTodoFromDB;
  }

  async deleteTodo(id: string) {
    const result = await dataSource.manager.delete(Todo, id);
    return result;
  }

  async getOneTodo(id: string) {
    const todoFromDB = await dataSource.manager.findOneBy(Todo, { id });
    return todoFromDB;
  }

  async updateTodo(id: string, data: ICreateUpdateTodo) {
    const dataForUpdate = {
      title: data.title,
      description: data.description,
      isComplete: data.isComplete,
      isPrivate: data.isPrivate
    };
    await dataSource.manager.update(Todo, { id }, dataForUpdate);
    const updatedTodo = await this.getOneTodo(id);
    return updatedTodo;
  }
}
