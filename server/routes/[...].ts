
import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const url = event.node.req.url;
  if (url && url.startsWith('/article/')) {
    const articleId = url.split('/')[2];
    const filePath = resolve(process.cwd(), `public/articles/${articleId}.html`);

    try {
      await fs.access(filePath);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return fileContent;
    } catch (error) {
      // File does not exist, let Nuxt handle the rendering
    }
  }
});
