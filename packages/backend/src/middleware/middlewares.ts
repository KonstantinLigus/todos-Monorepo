import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import dataSource from '../config/datasourse';
import { Todo } from '../entities/Todo';

export const tryCatchWrapper = (callback: Function) => {
  const wrapper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error: any) {
      res.status(error.status).json({ message: error.message });
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
