import { v4 as uuid } from 'uuid';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

const agents = {
  llm: async (input: string) => {
    const llm = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
    return (await llm.invoke(input)).content;
  },
  summarizer: async (input: string) => {
    const prompt = PromptTemplate.fromTemplate('Summarize the following text:\n{text}');
    const chain = new LLMChain({ llm: new ChatOpenAI(), prompt });
    return (await chain.invoke({ text: input })).text;
  },
  translator: async (input: string) => {
    const prompt = PromptTemplate.fromTemplate('Translate to French:\n{text}');
    const chain = new LLMChain({ llm: new ChatOpenAI(), prompt });
    return (await chain.invoke({ text: input })).text;
  },
  'web-scraper': async (input: string) => {
    // placeholder – can be replaced with Cheerio or Puppeteer
    return Mock scrape for: ;
  },
  emailer: async (input: string) => {
    return Mock email sent with body: ;
  },
};

export async function executeWorkflow(nodes: any[], edges: any[]) {
  const sorted = [...nodes].sort((a, b) => a.position.x - b.position.x);
  let output = '';
  for (const node of sorted) {
    const agent = agents[node.type as keyof typeof agents];
    if (agent) output = await agent(output || node.data.prompt || '');
  }
  return output;
}
