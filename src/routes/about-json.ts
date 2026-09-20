import { canonicalUrl, site } from '../config/site';
import { personJsonLd, websiteJsonLd } from '../utils/seo';

export function loader() {
  return Response.json({
    '@context': 'https://schema.org',
    '@graph': [
      personJsonLd(),
      websiteJsonLd(),
      {
        '@type': 'Organization',
        '@id': `${site.author.studioUrl}/#organization`,
        name: site.author.studio,
        url: site.author.studioUrl,
        description: 'A Mexico-based independent game studio and creative home for games, characters, devlogs, tutorials, and interactive projects.',
        founder: { '@id': `${site.url}/#aldo-pedro-rangel-montiel` },
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl('/about'),
        url: canonicalUrl('/about'),
        mainEntity: { '@id': `${site.url}/#aldo-pedro-rangel-montiel` },
      },
    ],
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
