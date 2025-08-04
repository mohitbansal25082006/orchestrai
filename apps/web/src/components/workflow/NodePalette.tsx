'use client';
import React, { DragEvent } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import WorkflowToolbar from './WorkflowToolbar';
import nodeConfig from '@/config/nodes.json';

const grouped = nodeConfig.reduce((acc, n) => {
  (acc[n.category] ||= []).push(n);
  return acc;
}, {} as Record<string, typeof nodeConfig>);

export default function NodePalette() {
  const onDragStart = (e: DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-72 border-r p-4 bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>

      <Accordion type="single" collapsible>
        {Object.entries(grouped).map(([cat, items]) => (
          <AccordionItem key={cat} value={cat}>
            <AccordionTrigger>{cat}</AccordionTrigger>
            <AccordionContent>
              {items.map((n) => (
                <div
                  key={n.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, n.id)}
                  className="cursor-grab"
                >
                  <Button variant="ghost" className="w-full justify-start mb-1">
                    {n.label}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-auto">
        <WorkflowToolbar />
      </div>
    </aside>
  );
}
