import { canonicalUrl, site } from '../config/site';
import { getPostSummaries } from '../utils/posts.server';
import { textResponse } from '../utils/xml.server';

export async function loader() {
  const posts = await getPostSummaries();
  const postLinks = posts.map((post) =>
    `- [${post.title}](${canonicalUrl(`/posts/${post.slug}`)}): ${post.description}`,
  );
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.author.name} (${site.author.handle}) is a software developer in ${site.author.location} and the solo creator behind ${site.author.studio}. The studio identity is one part of a broader body of software, game development, art, and technical writing work.`,
    '',
    '## Primary pages',
    '',
    `- [About](${canonicalUrl('/about')}): Background, current work, and the relationship between Aldo and Crimson R Games.`,
    `- [Projects](${canonicalUrl('/projects')}): Selected software and game projects.`,
    `- [Resume](${canonicalUrl('/resume')}): Professional software development experience.`,
    `- [Crimson R Games](${site.author.studioUrl}): Official site for games and interactive projects.`,
    '',
    '## Blog posts',
    '',
    ...postLinks,
    '',
    '## Feeds and indexes',
    '',
    `- [RSS feed](${site.url}/rss.xml)`,
    `- [XML sitemap](${site.url}/sitemap.xml)`,
    `- [Machine-readable profile](${site.url}/about.json)`,
    '',
  ].join('\n');

  return textResponse(body, 'text/plain');
}
