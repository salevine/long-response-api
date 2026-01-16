import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const specPath = join(process.cwd(), 'openapi.json');
    const specContent = readFileSync(specPath, 'utf8');
    const openapiSpec = JSON.parse(specContent);
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(openapiSpec);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load OpenAPI specification' });
  }
}
