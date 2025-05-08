import prisma from '../configs/prismaClient';

export const findByIds = async (userIds: string[]) => {
  return await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
};
