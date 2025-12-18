
import { getReleasedArticlesData } from '../server/core/data/article';
import { generateArticlePage } from '../server/core/service/page-generator';

async function generate() {
  const articles = await getReleasedArticlesData();
  if (articles instanceof Error) {
    console.error('Failed to get articles:', articles);
    return;
  }
  for (const article of articles) {
    await generateArticlePage(article);
  }
}

generate();
