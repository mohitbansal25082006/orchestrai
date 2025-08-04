import express from 'express';
import { executeWorkflow } from '../lib/executor.js';

const router = express.Router();

// POST /api/run  → execute the workflow
router.post('/run', async (req, res) => {
  console.log('Received nodes:', req.body.nodes);
  console.log('Received edges:', req.body.edges);

  try {
    const result = await executeWorkflow(req.body.nodes, req.body.edges);
    console.log('Backend result:', result);
    res.json({ result });
  } catch (e: any) {
    console.error('Executor error:', e);
    res.status(500).json({ error: e.message });
  }
});

export default router;