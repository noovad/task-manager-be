import { Router } from 'express';
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from '../controllers/project.controller';
import { createProjectValidator } from '../validators/project.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/projects', findAll);

router.get('/projects/:id', findOne);

router.post('/projects', createProjectValidator, validate, create);

router.put('/projects/:id', update);

router.delete('/projects/:id', remove);

export default router;
