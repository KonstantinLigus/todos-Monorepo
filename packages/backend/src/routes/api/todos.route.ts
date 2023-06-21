import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));
todosRouter.get('/:todoId', todoController.getTodoById.bind(todoController));
todosRouter.post('', todoController.createTodo.bind(todoController));
todosRouter.delete('', todoController.deleteTodo.bind(todoController));

export default todosRouter;
