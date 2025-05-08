import AppError from '../errors/app.error';
import * as projectRepositories from '../repositories/project.repositories';
import { HttpResponse } from '../utils/httpResponse';

const create = async () => {};

const findAll = async (userId: string) => {
  return projectRepositories.findAll(userId);
};

const findOne = async (userId: string, projectId: string) => {
  const data = await projectRepositories.findById(projectId);

  if (!data) {
    throw new AppError(HttpResponse.NOT_FOUND, [], 'Project not found');
  }

  const isMember = await projectRepositories.findByUserAndProject(
    userId,
    projectId
  );

  if (!isMember) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You are not a member of this project'
    );
  }

  return data;
};

const update = async () => {};

const remove = async () => {};

export { create, findAll, findOne, update, remove };
