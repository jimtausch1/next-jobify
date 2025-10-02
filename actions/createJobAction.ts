'use server';

import { createAndEditJobSchema, CreateAndEditJobType, JobType } from '@/types/next-jobify';
import prisma from '@/utils/db';
import { authenticateAndRedirect } from './authenticateAndRedirect';

export default async function createJobAction(values: CreateAndEditJobType) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}
