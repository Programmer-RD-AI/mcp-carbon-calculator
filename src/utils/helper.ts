import path from 'node:path';
import nunjucks from 'nunjucks';

export function renderTemplate(url: string) {
  const env = nunjucks.configure(path.join(__dirname, 'templates'), {
    autoescape: true,
  });
  return env.render('index.html', {
    url,
  });
}
