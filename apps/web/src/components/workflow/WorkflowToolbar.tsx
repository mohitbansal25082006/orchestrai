'use client';

import { useState } from 'react';
import { useWorkflows } from '@/lib/useWorkflows';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function WorkflowToolbar() {
  const { workflows, load, save, remove } = useWorkflows();
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    // TODO: pull real nodes/edges from ReactFlow
    const nodes: any[] = [];
    const edges: any[] = [];
    if (!title.trim()) return toast.warning('Enter a name');
    await save(title.trim(), nodes, edges);
    setTitle('');
  };

  return (
    <div className="p-4 border-t space-y-2">
      <Input
        placeholder="Workflow name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={handleSave} className="w-full">
        Save
      </Button>
      <Button variant="outline" onClick={load} className="w-full">
        Load All
      </Button>

      {workflows.map((wf) => (
        <div
          key={wf.id}
          className="flex justify-between items-center text-sm mb-1"
        >
          <span>{wf.title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(wf.id)}
          >
            🗑
          </Button>
        </div>
      ))}
    </div>
  );
}