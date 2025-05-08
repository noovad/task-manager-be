import { inviteRequest, projectRequest } from '../dto/project.dto';
import AppError from '../errors/app.error';
import * as projectRepositories from '../repositories/project.repositories';
import { findByIds } from '../repositories/user.repositories';
import { HttpResponse } from '../utils/httpResponse';

const create = async (project: projectRequest, userId: string) => {
  const data = await projectRepositories.create(project, userId);

  return data;
};

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

  const mappingData = {
    ...data,
    members: data.members.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      username: member.user.username,
      email: member.user.email,
      avatar: member.user.avatar,
    })),
  };

  return mappingData;
};

const update = async (
  payload: projectRequest,
  projectId: string,
  userId: string
) => {
  const data = await projectRepositories.findById(projectId);

  if (!data) {
    throw new AppError(HttpResponse.NOT_FOUND, [], 'Project not found');
  }

  if (data.ownerId !== userId) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You are not the owner of this project'
    );
  }
  const updatedData = await projectRepositories.update(payload, projectId);

  return updatedData;
};

const remove = async (projectId: string, userId: string) => {
  const data = await projectRepositories.findById(projectId);

  if (!data) {
    throw new AppError(HttpResponse.NOT_FOUND, [], 'Project not found');
  }

  if (data.ownerId !== userId) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You are not the owner of this project'
    );
  }

  return projectRepositories.remove(projectId);
};

const inviteMembers = async (
  projectId: string,
  userId: string,
  payload: inviteRequest
) => {
  const data = await projectRepositories.findById(projectId);

  if (!data) {
    throw new AppError(HttpResponse.NOT_FOUND, [], 'Project not found');
  }

  if (data.ownerId !== userId) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You are not the owner of this project'
    );
  }

  const usersToInvite = await findByIds(payload.users);

  if (usersToInvite.length !== payload.users.length) {
    throw new AppError(
      HttpResponse.NOT_FOUND,
      [],
      'One or more users not found'
    );
  }

  return await projectRepositories.inviteMembers(projectId, payload.users);
};

const removeMember = async (
  projectId: string,
  userId: string,
  memberId: string
) => {
  const data = await projectRepositories.findById(projectId);

  if (!data) {
    throw new AppError(HttpResponse.NOT_FOUND, [], 'Project not found');
  }

  if (data.ownerId !== userId) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You are not the owner of this project'
    );
  }

  const isMember = await projectRepositories.findByUserAndProject(
    memberId,
    projectId
  );

  if (!isMember) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'User to be removed is not a member of this project'
    );
  }

  if (userId === memberId) {
    throw new AppError(
      HttpResponse.FORBIDDEN,
      [],
      'You cannot remove yourself as the project owner'
    );
  }

  return projectRepositories.removeMember(projectId, memberId);
};

export {
  create,
  findAll,
  findOne,
  update,
  remove,
  inviteMembers,
  removeMember,
};
