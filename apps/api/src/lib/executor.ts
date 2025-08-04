// E:\orchestrai\apps\api\src\lib\executor.ts
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

function toString(res: any): string {
  if (typeof res === 'string') return res;
  if (Array.isArray(res.content)) return res.content.map(toString).join('');
  return res.content || '';
}

const agents: Record<string, (input: string) => Promise<string>> = {
  llm: async (input: string) => {
    const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
    return toString(await llm.invoke(input));
  },
  summarizer: async (input: string) => {
    const prompt = PromptTemplate.fromTemplate('Summarize:\n{text}');
    const chain = prompt.pipe(new ChatOpenAI());
    return toString(await chain.invoke({ text: input }));
  },
};

export async function executeWorkflow(nodes: any[], edges: any[]) {
  const sorted = [...nodes].sort((a, b) => a.position.x - b.position.x);
  let context = '';
  for (const node of sorted) {
    const key = node.data.label as keyof typeof agents; // use label as key
    const handler = agents[key];
    if (handler) {
      context = await handler(context || node.data.prompt || '');
    }
  }
  return context;
}