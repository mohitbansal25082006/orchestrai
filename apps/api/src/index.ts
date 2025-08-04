import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { createServer } from 'http';

import workflowRouter from './routes/workflow.js';
import workflowsRouter from './routes/workflows.js';
import { attachSocket } from './socket.js';

const app = express();
const prisma = new PrismaClient();
const redis = createClient({ url: process.env.REDIS_URL });

await redis.connect();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api', workflowRouter);
app.use('/api', workflowsRouter);

const server = createServer(app);
attachSocket(server);

server.listen(process.env.PORT, () =>
  console.log(`API & Socket ready at http://localhost:${process.env.PORT}`)
);