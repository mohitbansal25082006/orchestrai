import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/workflows – list all
router.get('/workflows', async (_req, res) => {
  const workflows = await prisma.workflow.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(workflows);
});

// GET /api/workflows/:id – single
router.get('/workflows/:id', async (req, res) => {
  const wf = await prisma.workflow.findUnique({ where: { id: req.params.id } });
  if (!wf) return res.status(404).json({ error: 'Not found' });
  res.json(wf);
});

// POST /api/workflows – create or update
router.post('/workflows', async (req, res) => {
  const { title, nodes, edges, id } = req.body;
  const data = { title, nodes, edges };
  const workflow = id
    ? await prisma.workflow.update({ where: { id }, data })
    : await prisma.workflow.create({ data });
  res.json(workflow);
});

// DELETE /api/workflows/:id
router.delete('/workflows/:id', async (req, res) => {
  await prisma.workflow.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;
