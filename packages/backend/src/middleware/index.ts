import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import dataSource from '../config/datasourse';
import { Todo } from '../entities/Todo';
import { IReq, IReqError } from '../types/todos.type';
import UserService from '../services/users.service';
import { Filter } from '../entities/Filter';
import TodoService from '../services/todo.service';

const userService = new UserService();
const todoService = new TodoService();

export const tryCatchWrapper = (callback: Function) => {
  const wrapper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (error instanceof IReqError) {
        res.status(error.status).json({ message: error.message });
      }
    }
  };
  return wrapper;
};

export const isTodoExist = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<T | void> => {
  try {
    await dataSource.manager.findOneBy(Todo, { id: req.params.todoId });
    next();
  } catch (error) {
    res.status(404).json({ message: 'Not found. Wrong id' });
  }
};

export const isUserExist = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<T | void> => {
  const { email } = req.body;
  const { name } = req.body;
  const userFromDBbyEmail = email && (await userService.getUserBy({ email }));
  const userFromDBbyName = name && (await userService.getUserBy({ name }));

  if (userFromDBbyEmail) {
    res.status(409).json({ message: 'email in use' });
    return;
  }

  if (userFromDBbyName) {
    res.status(409).json({ message: 'name in use' });
    return;
  }

  next();
};

export const isUserExistChecker = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<T | void> => {
  const { user: id } = req;
  const userFromDBbyId = typeof id === 'string' && (await userService.getUserBy({ id }));
  if (!userFromDBbyId) {
    res.status(401).json({ message: "user doesn't exist" });
    return;
  }
  next();
};

export const validationBody = (schema: Joi.Schema) => {
  const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  };
  return validate;
};

export const createTodosFilter = async (req: IReq, res: Response, next: NextFunction) => {
  const userId = req.user;
  const { query } = req;
  const queryKeys = Object.keys(query);
  const filter: Partial<Filter> = {};
  let filterFromDB = null;

  if (queryKeys.length === 2 && queryKeys.includes('perPage') && queryKeys.includes('page')) {
    next();
  }

  if (queryKeys.length !== 0) {
    let key: keyof typeof query;
    for (key in query) {
      if (query.hasOwnProperty(key) && key !== 'perPage' && key !== 'page') {
        const value =
          query[key] === 'true' || query[key] === 'false' ? JSON.parse(query[key]) : query[key];
        Object.defineProperty(filter, key, { value });
      }
    }

    filterFromDB = await todoService.createFilter(filter, userId);
  }
  if (filterFromDB) {
    req.filters = filterFromDB;
  }
  next();
};
