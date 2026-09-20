import type { MetaDescriptor } from 'react-router';
import { absoluteAssetUrl, canonicalUrl, site } from '../config/site';

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function pageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  tags = [],
  jsonLd,
}: PageMetaOptions): MetaDescriptor[] {
  const url = canonicalUrl(path);
  const imageUrl = image ? absoluteAssetUrl(image) : undefined;
  const meta: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { name: 'author', content: site.author.name },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: imageUrl ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: `@${site.author.handle}` },
    { tagName: 'link', rel: 'canonical', href: url },
  ];

  if (imageUrl) {
    meta.push(
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:image', content: imageUrl },
    );
  }

  if (publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime });
  }

  for (const tag of tags) {
    meta.push({ property: 'article:tag', content: tag });
  }

  if (jsonLd) {
    const documents = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const document of documents) {
      meta.push({ 'script:ld+json': document });
    }
  }

  return meta;
}

export function personJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#aldo-pedro-rangel-montiel`,
    name: site.author.name,
    alternateName: site.author.handle,
    url: canonicalUrl('/about'),
    homeLocation: {
      '@type': 'Place',
      name: site.author.location,
    },
    jobTitle: 'Lead Software Development Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Thomson Reuters',
    },
    affiliation: {
      '@type': 'Organization',
      name: site.author.studio,
      url: site.author.studioUrl,
    },
    sameAs: [site.author.githubUrl, site.author.studioUrl],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${site.url}/#blog`,
    name: site.name,
    url: canonicalUrl('/'),
    description: site.description,
    inLanguage: 'en',
    author: { '@id': `${site.url}/#aldo-pedro-rangel-montiel` },
  };
}
