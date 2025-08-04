'use client';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Props {
  node: any;
  onClose: () => void;
  onSave: (id: string, data: any) => void;
}

export default function NodeConfigSheet({ node, onClose, onSave }: Props) {
  const [prompt, setPrompt] = useState(node.data.prompt || '');

  const handleSave = () => {
    onSave(node.id, { prompt });
  };

  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {node.data.label}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium">Prompt / Config</label>
          <Textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter prompt or config..."
          />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
