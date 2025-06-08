const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  // Create sample posts
  const posts = [
    {
      title: 'Getting Started with Next.js',
      content: "Next.js is a powerful React framework that makes building full-stack applications easy. In this post, we'll explore the basics of Next.js and how to get started with your first project.",
      authorId: user.id,
      published: true,
    },
    {
      title: 'Understanding Server Components',
      content: 'Server Components are a new feature in React that allows you to write components that run on the server. This post explains how they work and when to use them.',
      authorId: user.id,
      published: true,
    },
    {
      title: 'Building with Prisma',
      content: 'Prisma is a modern database toolkit that makes working with databases easier. Learn how to use Prisma with Next.js to build powerful applications.',
      authorId: user.id,
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 