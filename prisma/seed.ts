import { PrismaClient, Priority, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          username: faker.internet.userName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          password: 'hashed_password',
        },
      })
    )
  );

  const projects = await Promise.all(
    Array.from({ length: 4 }).map((_, i) =>
      prisma.project.create({
        data: {
          title: `Project ${i + 1}`,
          description: faker.lorem.sentence(),
          ownerId: users[i % users.length].id,
        },
      })
    )
  );

  for (const project of projects) {
    for (const user of users) {
      await prisma.projectMember.create({
        data: {
          projectId: project.id,
          userId: user.id,
        },
      });
    }
  }

  const priorities = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
  const statuses = [Status.TODO, Status.IN_PROGRESS, Status.DONE];

  await Promise.all(
    Array.from({ length: 30 }).map((_, i) =>
      prisma.task.create({
        data: {
          title: faker.hacker.phrase(),
          description: faker.lorem.sentences(2),
          notes: faker.lorem.sentence(),
          dueDate: faker.date.soon({ days: 30 }),
          priority: faker.helpers.arrayElement(priorities),
          status: faker.helpers.arrayElement(statuses),
          projectId: projects[i % projects.length].id,
          assignedUserId: users[i % users.length].id,
        },
      })
    )
  );
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
