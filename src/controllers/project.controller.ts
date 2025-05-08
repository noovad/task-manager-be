import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpResponse } from '../utils/httpResponse';
import * as projectService from '../services/project.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const newProject = req.body;

  const data = await projectService.create(newProject, userId);

  res.status(201).json(HttpResponse.OK('Project created successfully', data));
});

const findAll = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const data = await projectService.findAll(userId);

  res
    .status(200)
    .json(HttpResponse.OK('Projects retrieved successfully', data));
});

const findOne = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const { id: projectId } = req.params;

  const data = await projectService.findOne(userId, projectId);

  res.status(200).json(HttpResponse.OK('Project retrieved successfully', data));
});

const update = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const { id: projectId } = req.params;

  const payload = req.body;

  const data = await projectService.update(payload, projectId, userId);
  res.status(200).json(HttpResponse.OK('Project updated successfully', data));
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const { id: projectId } = req.params;

  await projectService.remove(projectId, userId);

  res.status(204).json(HttpResponse.OK());
});

const inviteMembers = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const { id: projectId } = req.params;

  const payload = req.body;

  await projectService.inviteMembers(projectId, userId, payload);
  res.status(201).json(HttpResponse.OK('User invited successfully'));
});

const removeMember = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = 'cb64cc7f-3b23-4c4b-af77-0a56ff9853a5';

  const { id: projectId } = req.params;

  const { id: memberId } = req.body;

  await projectService.removeMember(projectId, userId, memberId);
  res.status(204).json(HttpResponse.OK());
});

export {
  create,
  findAll,
  findOne,
  update,
  remove,
  inviteMembers,
  removeMember,
};
