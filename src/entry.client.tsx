import { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

const legacyHashPath = window.location.hash.startsWith('#/')
  ? window.location.hash.slice(1)
  : null;

function hydrate() {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
}

if (legacyHashPath) {
  const [pathname = '/', query] = legacyHashPath.split('?');
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
  window.location.replace(query ? `${normalizedPath}?${query}` : normalizedPath);
} else if (document.querySelector('meta[name="page-kind"][content="not-found"]')) {
  // The static 404 must preserve an arbitrary failed URL, so it is not hydrated.
} else {
  startTransition(hydrate);
}
