export const site = {
  name: "Aldo's Blog",
  title: 'Aldo Pedro Rangel Montiel Blog | Crimson R Games Devlogs',
  description:
    'Devlogs and technical notes by Aldo Pedro Rangel Montiel, solo developer behind Crimson R Games, a Mexico-based indie studio making games and digital experiences.',
  url: 'https://aldoram5.github.io',
  author: {
    name: 'Aldo Pedro Rangel Montiel',
    handle: 'aldoram5',
    location: 'Mexico City, Mexico',
    studio: 'Crimson R Games',
    studioUrl: 'https://crimsonrgames.com',
    githubUrl: 'https://github.com/aldoram5',
  },
} as const;

export function canonicalUrl(path = '/'): string {
  if (path === '/') return `${site.url}/`;

  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${site.url}${normalizedPath}`;
}

export function absoluteAssetUrl(path: string): string {
  return new URL(path, `${site.url}/`).toString();
}
