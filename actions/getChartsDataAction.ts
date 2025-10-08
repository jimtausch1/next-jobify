'use server';

import prisma from '@/utils/db';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { authenticateAndRedirect } from './authenticateAndRedirect';

export default async function getChartsDataAction() {
  const userId = await authenticateAndRedirect();
  const threeYearsAgo = dayjs().subtract(3, 'year').toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: threeYearsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch {
    redirect('/jobs');
  }
}
