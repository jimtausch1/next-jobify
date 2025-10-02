'use server';

import { JobType } from '@/types/next-jobify';
import prisma from '@/utils/db';
import { authenticateAndRedirect } from './authenticateAndRedirect';

export default async function deleteJobAction(id: string) {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch {
    return null;
  }
}
