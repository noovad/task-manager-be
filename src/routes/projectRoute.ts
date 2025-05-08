import { Router } from 'express';
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from '../controllers/project.controller';

const router = Router();

router.get('/projects', findAll);

router.get('/projects/:id', findOne);

router.post('/projects', create);

router.put('/projects/:id', update);

router.delete('/projects/:id', remove);

export default router;
