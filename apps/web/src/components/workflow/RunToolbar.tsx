'use client';

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useNodes, useEdges } from 'reactflow';

export default function RunToolbar() {
  const nodes = useNodes();
  const edges = useEdges();

  const run = useCallback(async () => {
    if (!nodes.length) {
      toast.warning('Canvas is empty');
      return;
    }

    try {
      // Strip React-Flow internals → keep only serialisable data
      const payload = {
        nodes: nodes.map(n => ({
          id: n.id,
          type: n.type,
          data: n.data,
          position: n.position,
        })),
        edges: edges.map(e => ({
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: e.sourceHandle,
          targetHandle: e.targetHandle,
        })),
      };

      const { data } = await api.post('/run', payload);
      toast.success('Workflow finished: ' + (data.result || 'OK'));
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Run failed');
    }
  }, [nodes, edges]);

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <Button onClick={run} size="lg">
        ▶ Run Workflow
      </Button>
    </div>
  );
}