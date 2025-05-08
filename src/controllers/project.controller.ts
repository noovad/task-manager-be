import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpResponse } from '../utils/httpResponse';
import * as projectService from '../services/project.service';

const create = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json(HttpResponse.OK('Project created successfully'));
});

const findAll = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = '8c6ab86f-ffe4-4ded-bac2-252fc4ce4c90';

  const data = await projectService.findAll(userId);

  res
    .status(200)
    .json(HttpResponse.OK('Projects retrieved successfully', data));
});

const findOne = asyncHandler(async (req: Request, res: Response) => {
  // TODO: Nanti userId diambil dari middleware auth req.user.id
  const userId = '8c6ab86f-ffe4-4ded-bac2-252fc4ce4c90';

  const { id: projectId } = req.params;

  const data = await projectService.findOne(userId, projectId);

  res.status(200).json(HttpResponse.OK('Project retrieved successfully', data));
});

const update = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(HttpResponse.OK('Project updated successfully'));
});

const remove = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(HttpResponse.OK('Project deleted successfully'));
});

export { create, findAll, findOne, update, remove };
