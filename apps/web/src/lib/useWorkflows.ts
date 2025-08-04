'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<any[]>([]);

  const load = async () => {
    try {
      const { data } = await api.get('/workflows');
      setWorkflows(data);
    } catch {
      toast.error('Failed to load workflows');
    }
  };

  const save = async (title: string, nodes: any[], edges: any[]) => {
    try {
      const { data } = await api.post('/workflows', { title, nodes, edges });
      await load();
      toast.success('Workflow saved');
      return data;
    } catch {
      toast.error('Save failed');
    }
  };

  const remove = async (id: string) => {
    try {
      await api.delete(`/workflows/${id}`);
      await load();
      toast.success('Workflow deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return { workflows, load, save, remove };
}