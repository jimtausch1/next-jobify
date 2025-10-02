'use server';

import { CreateAndEditJobType, JobType } from '@/types/next-jobify';
import prisma from '@/utils/db';
import { authenticateAndRedirect } from './authenticateAndRedirect';

export default async function updateJobAction(id: string, values: CreateAndEditJobType) {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch {
    return null;
  }
}
