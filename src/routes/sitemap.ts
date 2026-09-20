import { canonicalUrl } from '../config/site';
import { getPostSummaries } from '../utils/posts.server';
import { escapeXml, textResponse } from '../utils/xml.server';

const staticPaths = ['/', '/about', '/projects', '/resume'];

export async function loader() {
  const posts = await getPostSummaries();
  const staticUrls = staticPaths.map((path) => [
    '  <url>',
    `    <loc>${escapeXml(canonicalUrl(path))}</loc>`,
    '  </url>',
  ].join('\n'));
  const postUrls = posts.map((post) => [
    '  <url>',
    `    <loc>${escapeXml(canonicalUrl(`/posts/${post.slug}`))}</loc>`,
    `    <lastmod>${post.date}</lastmod>`,
    '  </url>',
  ].join('\n'));
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...postUrls,
    '</urlset>',
    '',
  ].join('\n');

  return textResponse(xml, 'application/xml');
}
