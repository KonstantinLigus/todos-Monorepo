import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { isTodoExist, tryCatchWrapper, validationBody } from '../../middleware';
import { schemaPostTodo, schemaPutTodo } from '../../schemas/schema.joi';
import enableStrategyJWT from '../../strategy/passport.strategy.JWT';
import authenticateJWT from '../../strategy/passport.authenticate.JWT';

const todosRouter: Router = Router();

todosRouter.get('/public', tryCatchWrapper(todoController.getAllTodo.bind(todoController)));

enableStrategyJWT();
todosRouter.use(authenticateJWT());

todosRouter.get('', tryCatchWrapper(todoController.getAllTodo.bind(todoController)));
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
