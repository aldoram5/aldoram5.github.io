import { canonicalUrl, site } from '../config/site';
import { getPostSummaries } from '../utils/posts.server';
import { escapeXml, textResponse } from '../utils/xml.server';

export async function loader() {
  const posts = await getPostSummaries();
  const items = posts.map((post) => {
    const url = canonicalUrl(`/posts/${post.slug}`);
    const categories = post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n');
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <description>${escapeXml(post.description)}</description>`,
      categories,
      '    </item>',
    ].filter(Boolean).join('\n');
  });
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(site.name)}</title>`,
    `    <link>${escapeXml(canonicalUrl('/'))}</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    '    <language>en-us</language>',
    `    <atom:link href="${escapeXml(`${site.url}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return textResponse(xml, 'application/rss+xml');
}
