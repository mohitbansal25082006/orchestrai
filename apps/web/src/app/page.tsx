import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';
import NodePalette from '@/components/workflow/NodePalette';

export default function Home() {
  return (
    <div className='flex h-screen w-full'>
      <NodePalette />
      <WorkflowCanvas />
    </div>
  );
}
