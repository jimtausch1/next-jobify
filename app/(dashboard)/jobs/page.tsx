import getAllJobsAction from '@/actions/getAllJobsAction';
import JobsList from '@/components/JobsList';
import SearchForm from '@/components/SearchForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function AllJobsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({}),
  });

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm />
        <JobsList />
      </HydrationBoundary>
    </Suspense>
  );
}
