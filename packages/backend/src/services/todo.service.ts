import { Todo } from '../entities/Todo';
import dataSource from '../config/datasourse';
import { ICreateUpdateTodo } from '../types/todos.type';

export default class TodoService {
  async findAllPublic() {
    const allTodosFromDB = await dataSource.manager.find(Todo);
    return allTodosFromDB;
  }

  async findAll(userId: string) {
    const allTodosFromDB = await dataSource.manager.findBy(Todo, { owner: userId });
    return allTodosFromDB;
  }

  async createTodo(todoReq: ICreateUpdateTodo) {
    const todo = new Todo();
    todo.title = todoReq.title;
    todo.description = todoReq.description;
    todo.isComplete = todoReq.isComplete;
    todo.isPrivate = todoReq.isPrivate;
    todo.owner = todoReq.owner;
    const savedTodoFromDB = await dataSource.manager.save(todo);
    return savedTodoFromDB;
  }

  async deleteTodo(userId: string, todoId: string) {
    const result = await dataSource.manager.delete(Todo, { id: todoId, owner: userId });
    return result;
  }

  async getOneTodo(userId: string, todoId: string) {
    const todoFromDB = await dataSource.manager.findOneBy(Todo, { id: todoId, owner: userId });
    return todoFromDB;
  }

  async updateTodo(userId: string, todoId: string, data: ICreateUpdateTodo) {
    const dataForUpdate = {
      title: data.title,
      description: data.description,
      isComplete: data.isComplete,
      isPrivate: data.isPrivate
    };
    await dataSource.manager.update(Todo, { id: todoId, owner: userId }, dataForUpdate);
    const updatedTodo = await this.getOneTodo(userId, todoId);
    return updatedTodo;
  }
}
