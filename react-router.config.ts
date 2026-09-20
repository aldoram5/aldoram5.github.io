import { copyFile } from 'node:fs/promises';
import type { Config } from '@react-router/dev/config';
import { getAllPostSlugs } from './src/utils/posts.server';

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  ssr: false,
  routeDiscovery: { mode: 'initial' },
  async prerender({ getStaticPaths }) {
    const [staticPaths, slugs] = await Promise.all([
      getStaticPaths(),
      getAllPostSlugs(),
    ]);

    return [
      ...staticPaths,
      '/404',
      ...slugs.map((slug) => `/posts/${slug}`),
    ];
  },
  async buildEnd() {
    const notFoundPage = 'dist/client/404/index.html';
    await Promise.all([
      copyFile(notFoundPage, 'dist/client/404.html'),
      copyFile(notFoundPage, 'dist/client/__spa-fallback.html'),
    ]);
  },
} satisfies Config;
