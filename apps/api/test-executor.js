import { executeWorkflow } from './src/lib/executor.js';

(async () => {
  const result = await executeWorkflow(
    [
      { type: 'llm', data: { prompt: 'Explain quantum physics in 2 sentences' }, position: { x: 0, y: 0 } },
      { type: 'summarizer', data: { prompt: 'Summarize the above explanation in one sentence' }, position: { x: 200, y: 0 } },
    ],
    []
  );
  console.log(result);
})();