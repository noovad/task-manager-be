import { Router } from 'express';
import {
  create,
  findAll,
  findOne,
  update,
  remove,
  inviteMembers,
  removeMember,
} from '../controllers/project.controller';
import { createProjectValidator } from '../validators/project.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.get('/projects', findAll);

router.get('/projects/:id', findOne);

router.post('/projects', createProjectValidator, validate, create);

router.post('/projects/:id/invite', inviteMembers);

router.put('/projects/:id', update);

router.delete('/projects/:id', remove);

router.delete('/projects/:id/remove-member', removeMember);

export default router;
