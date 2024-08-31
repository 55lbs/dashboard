import * as React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@55lbs/components';

export function ModeToggleSingle() {
  const [theme, setThemeState] = React.useState<
    'theme-light' | 'dark' | 'system'
  >('theme-light');

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'theme-light');
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() =>
        setThemeState(theme === 'theme-light' ? 'dark' : 'theme-light')
      }
    >
      <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
