// E:\orchestrai\apps\api\src/socket.ts
import { Server } from 'socket.io';
import * as Y from 'yjs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const docs = new Map<string, Y.Doc>();

export function attachSocket(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    socket.on('join-room', (roomId: string) => {
      if (!docs.has(roomId)) docs.set(roomId, new Y.Doc());
      const doc = docs.get(roomId)!;

      const canvasMap = doc.getMap('canvas');

      const nodes = canvasMap.get('nodes') || [];
      const edges = canvasMap.get('edges') || [];
      socket.emit('canvas-init', { nodes, edges });

      canvasMap.observe(() => {
        socket.broadcast.to(roomId).emit('canvas-update', {
          nodes: canvasMap.get('nodes'),
          edges: canvasMap.get('edges'),
        });
      });

      socket.on('update-canvas', (payload) => {
        canvasMap.set('nodes', payload.nodes);
        canvasMap.set('edges', payload.edges);
      });

      socket.on('generate-image', async ({ prompt }: { prompt: string }) => {
        try {
          const res = await openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '512x512',
          });
          socket.emit('image-result', { url: res.data?.[0]?.url ?? '' });
        } catch (e) {
          socket.emit('image-result', { error: (e as Error).message });
        }
      });

      socket.on('disconnect', () => console.log('🔴 user left', socket.id));
    });
  });
}