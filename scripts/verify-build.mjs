import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, 'dist/client');
const contentDirectory = path.join(projectRoot, 'public/posts/content');
const siteUrl = 'https://aldoram5.github.io';

async function exists(relativePath) {
  await access(path.join(outputDirectory, relativePath));
}

async function output(relativePath) {
  return readFile(path.join(outputDirectory, relativePath), 'utf8');
}

const postFiles = (await readdir(contentDirectory))
  .filter((filename) => filename.endsWith('.md'))
  .sort();
const posts = await Promise.all(postFiles.map(async (filename) => {
  const source = await readFile(path.join(contentDirectory, filename), 'utf8');
  const { data } = matter(source);
  return { filename, slug: data.slug };
}));

await Promise.all([
  exists('index.html'),
  exists('about/index.html'),
  exists('projects/index.html'),
  exists('resume/index.html'),
  exists('404.html'),
  exists('sitemap.xml'),
  exists('robots.txt'),
  exists('rss.xml'),
  exists('llms.txt'),
  exists('about.json'),
]);

const [sitemap, robots, rss, llms, aboutJson] = await Promise.all([
  output('sitemap.xml'),
  output('robots.txt'),
  output('rss.xml'),
  output('llms.txt'),
  output('about.json'),
]);

assert.match(robots, /Sitemap: https:\/\/aldoram5\.github\.io\/sitemap\.xml/);
assert.doesNotThrow(() => JSON.parse(aboutJson));

for (const post of posts) {
  assert.equal(typeof post.slug, 'string', `${post.filename} is missing a slug`);
  const canonical = `${siteUrl}/posts/${post.slug}/`;
  const html = await output(`posts/${post.slug}/index.html`);

  assert.ok(html.includes('<article'), `${post.slug} is missing article HTML`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${post.slug} is missing its canonical URL`);
  assert.ok(html.includes('"@type":"BlogPosting"'), `${post.slug} is missing BlogPosting JSON-LD`);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${post.slug} is missing from sitemap.xml`);
  assert.ok(rss.includes(`<link>${canonical}</link>`), `${post.slug} is missing from rss.xml`);
  assert.ok(llms.includes(`](${canonical})`), `${post.slug} is missing from llms.txt`);
}

console.log(`Verified ${posts.length} prerendered blog posts and required discovery files.`);
