import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.student.deleteMany();
  console.log('Seeding');

  const student1 = await prisma.student.create({
    data: {
      email: 'berkaybayrak@gmail.com',
      name: 'berkay',
    },
  });
  const student2 = await prisma.student.create({
    data: {
      email: 'fatihyelboga@gmail.com',
      name: 'fatih',
    },
  });
  const student3 = await prisma.student.create({
    data: {
      email: 'cagataybayraka@gmail.com',
      name: 'cagatay',
    },
  });
  await prisma.post.create({
    data: {
      color: 'Blue',
      text: 'blue-post',
      studentId: student1.id,
      createdAt: new Date(),
    },
  });
  await prisma.post.create({
    data: {
      color: 'White',
      text: 'white-post',
      studentId: student1.id,
    },
  });
  await prisma.post.create({
    data: {
      color: 'Red',
      text: 'red-post',
      studentId: student2.id,
    },
  });
}

main()
  .catch((err) => console.log(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
