import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function ingestPDF(filePath: string) {
  // For demo we’ll use a simple text loader
  const loader = new TextLoader(filePath);
  const docs = await loader.load();
  const vectorStore = await Chroma.fromDocuments(docs, embeddings, {
    collectionName: 'demo',
    url: 'http://localhost:8000',
  });
  return vectorStore;
}
