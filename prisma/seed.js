import data from '../assets/mock-data.json' with { type: "json" };
import { PrismaClient } from '../lib/generated/prisma/index.js';

// const data = require('./mock-data.json');
const prisma = new PrismaClient();

async function main() {
  const clerkId = 'user_33LkcNd1beFPoYYG5fa7TuY6nHF';
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });