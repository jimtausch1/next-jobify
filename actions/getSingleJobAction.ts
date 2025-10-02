'use server';

import { JobType } from '@/types/next-jobify';
import prisma from '@/utils/db';
import { redirect } from 'next/navigation';
import { authenticateAndRedirect } from './authenticateAndRedirect';

export default async function getSingleJobAction(id: string) {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch {
    job = null;
  }

  if (!job) {
    redirect('/jobs');
  }

  return job;
}
