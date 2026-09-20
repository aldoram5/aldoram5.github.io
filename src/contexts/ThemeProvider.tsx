import { useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme';

const themeChangeEvent = 'aldoram5-theme-change';

function preferredTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
}

function subscribe(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  window.addEventListener(themeChangeEvent, onStoreChange);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, preferredTheme, (): Theme => 'light');
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', nextTheme);
      } catch {
        // The visual preference still applies when storage is unavailable.
      }
      applyTheme(nextTheme);
      window.dispatchEvent(new Event(themeChangeEvent));
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
