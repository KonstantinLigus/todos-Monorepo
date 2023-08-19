import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import {
  createTodosFilter,
  isTodoExist,
  isUserExistChecker,
  tryCatchWrapper,
  validationBody
} from '../../middleware';
import { schemaPostTodo, schemaPutTodo } from '../../schemas/schema.joi';
import enableStrategyJWT from '../../strategy/passport.strategy.JWT';
import authenticateJWT from '../../strategy/passport.authenticate.JWT';

const todosRouter: Router = Router();

enableStrategyJWT();

todosRouter.get('/public', tryCatchWrapper(todoController.getAllTodoPublic.bind(todoController)));

todosRouter.use(authenticateJWT);

todosRouter.use(isUserExistChecker);

todosRouter.get(
  '',
  tryCatchWrapper(createTodosFilter),
  tryCatchWrapper(todoController.getTodos.bind(todoController))
);
todosRouter.get('/filter', tryCatchWrapper(todoController.getFilter.bind(todoController)));
todosRouter.get(
  '/:todoId',
  isTodoExist,
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.put(
  '/:todoId',
  [isTodoExist, validationBody(schemaPutTodo)],
  tryCatchWrapper(todoController.updateTodoById.bind(todoController))
);

todosRouter.post(
  '',
  [validationBody(schemaPostTodo)],
  tryCatchWrapper(todoController.createTodo.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  [isTodoExist],
  tryCatchWrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
