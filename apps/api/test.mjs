import 'dotenv/config';               // loads .env automatically
import { ingestPDF } from './src/lib/vector.js';

await ingestPDF('sample.txt');
console.log('? Ingested');
