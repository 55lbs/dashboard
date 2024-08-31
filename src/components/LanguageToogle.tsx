import * as React from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@55lbs/components';

export function LanguageToggle({
  currentLanguage,
  availableLanguages,
  currentPathname,
}) {
  const handleLanguageClick = React.useCallback((lang) => {
    location.href = `/${lang}${currentPathname.replace(`/${currentLanguage}`, '')}`;
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="uppercase">
          {currentLanguage}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((l) => (
          <DropdownMenuItem
            className="uppercase"
            onClick={() => handleLanguageClick(l)}
          >
            {l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
