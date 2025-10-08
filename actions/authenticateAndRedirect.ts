import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth();
  console.log('userId', userId);

  if (!userId) {
    redirect('/');
  }
  return userId;
}
