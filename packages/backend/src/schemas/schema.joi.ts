import Joi from 'joi';

export const schemaPostTodo = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isComplete: Joi.bool(),
  isPrivate: Joi.bool()
});

export const schemaPutTodo = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  isComplete: Joi.bool(),
  isPrivate: Joi.bool()
});
