import getChartsDataAction from '@/actions/getChartsDataAction';
import getStatsAction from '@/actions/getStatsAction';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ChartsContainer from './ChartsContainer';
import StatsContainer from './StatsContainer';

export default async function StatsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
}
