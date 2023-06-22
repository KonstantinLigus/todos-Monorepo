import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { isTodoExist, tryCatchWrapper, validationBody } from '../../middleware/middlewares';
import { schemaPostContact, schemaPutContact } from '../../schemas/schema.joi';

const todosRouter: Router = Router();

todosRouter.get('', tryCatchWrapper(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:todoId',
  isTodoExist,
  tryCatchWrapper(todoController.getTodoById.bind(todoController))
);

todosRouter.put(
  '/:todoId',
  [isTodoExist, validationBody(schemaPutContact)],
  tryCatchWrapper(todoController.updateTodoById.bind(todoController))
);

todosRouter.post(
  '',
  [validationBody(schemaPostContact)],
  tryCatchWrapper(todoController.createTodo.bind(todoController))
);

todosRouter.delete(
  '/:todoId',
  [isTodoExist],
  tryCatchWrapper(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
