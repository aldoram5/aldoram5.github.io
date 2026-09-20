import { site } from '../config/site';
import { textResponse } from '../utils/xml.server';

export function loader() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /posts/content/',
    'Disallow: /*.data$',
    '',
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ].join('\n');

  return textResponse(body, 'text/plain');
}
