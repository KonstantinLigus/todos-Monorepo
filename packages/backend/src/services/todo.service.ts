import { getFilterQuery } from '../helpers';
import { Todo } from '../entities/Todo';
import dataSource from '../config/datasourse';
import { ICreateUpdateTodo, IFindTodos, ITodoCount } from '../types/todos.type';
import { Filter } from '../entities/Filter';

export default class TodoService {
  async findAllPublic() {
    const allTodosFromDB = await dataSource.manager.find(Todo);
    return allTodosFromDB;
  }

  async findTodos({ userId, filters, skip, take }: IFindTodos) {
    let todosFromDB = null;
    if (filters && typeof skip === 'number' && typeof take === 'number') {
      const filterQuery = getFilterQuery(filters);
      todosFromDB = await dataSource.manager.find(Todo, {
        where: { owner: userId, ...filterQuery },
        skip,
        take
      });
    }
    if (filters && typeof skip !== 'number' && typeof take !== 'number') {
      const filterQuery = getFilterQuery(filters);
      todosFromDB = await dataSource.manager.find(Todo, {
        where: { owner: userId, ...filterQuery }
      });
    }
    if (!filters && typeof skip === 'number' && typeof take === 'number') {
      todosFromDB = await dataSource.manager.find(Todo, {
        where: { owner: userId },
        skip,
        take
      });
    }
    if (!filters && !skip && !take) {
      todosFromDB = await dataSource.manager.find(Todo, {
        where: { owner: userId }
      });
    }
    return todosFromDB;
  }

  async countTodos({ owner, filters }: ITodoCount) {
    const filterQuery = getFilterQuery(filters);

    const count = await dataSource.manager.countBy(Todo, { owner, ...filterQuery });
    return count;
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

  async createFilter(filter: Partial<Filter>, owner: string) {
    const { title, isComplete, isPrivate } = filter;

    await dataSource.manager.upsert(Filter, { title, isComplete, isPrivate, owner }, ['owner']);
    const filterFromDB = await dataSource.manager.findOneBy(Filter, { owner });

    if (filterFromDB) {
      return {
        title: filterFromDB.title,
        isComplete: filterFromDB.isComplete,
        isPrivate: filterFromDB.isPrivate
      };
    }
    return null;
  }

  async getFilter(owner: string) {
    const filterFromDB = await dataSource.manager.findOneBy(Filter, { owner });
    return filterFromDB;
  }
}
