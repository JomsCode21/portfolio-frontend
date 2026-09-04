import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('portfolio-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b1120');
  }, [theme]);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const button = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--theme-toggle-x', `${button.left + button.width / 2}px`);
    root.style.setProperty('--theme-toggle-y', `${button.top + button.height / 2}px`);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const viewTransitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => void;
    };

    if (viewTransitionDocument.startViewTransition && !reduceMotion) {
      viewTransitionDocument.startViewTransition(() => setTheme(nextTheme));
    } else {
      setTheme(nextTheme);
    }
  };

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Sun className="theme-toggle-sun" size={17} aria-hidden="true" />
      <Moon className="theme-toggle-moon" size={16} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
