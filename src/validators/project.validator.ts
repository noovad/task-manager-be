import { checkSchema } from 'express-validator';

export const createProjectValidator = checkSchema({
  title: {
    in: ['body'],
    errorMessage: 'Title is required',
    isLength: {
      options: { min: 3 },
      errorMessage: 'Title must be at least 3 characters',
    },
    trim: true,
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
  },
});
