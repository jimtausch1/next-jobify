import getSingleJobAction from '@/actions/getSingleJobAction';
import EditJobForm from '@/components/EditJobForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type JobDetailPageProps = {
  params: { id: string };
};

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['job', params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}
