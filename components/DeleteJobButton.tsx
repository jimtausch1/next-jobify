'use client';

import deleteJobAction from '@/actions/deleteJobAction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from './ui/button';

type DeleteJobButtonProps = {
  id: string;
};

export default function DeleteJobButton({ id }: DeleteJobButtonProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast.error('there was an error');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast.success('job removed');
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}
