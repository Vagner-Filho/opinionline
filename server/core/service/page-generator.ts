import { promises as fs } from 'fs';
import { resolve } from 'path';

export async function generateArticlePage(article: any) {
  const html = await $fetch(`/article/${article.id}`);

  if (html) {
    const dir = resolve(process.cwd(), 'public/articles');
    await fs.mkdir(dir, { recursive: true });

    const filePath = resolve(dir, `${article.id}.html`);
    await fs.writeFile(filePath, html);
  }
}
