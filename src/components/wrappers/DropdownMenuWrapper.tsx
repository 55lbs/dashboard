import { Button, DropdownMenu, DropdownMenuTrigger } from '@55lbs/components';

export function DropdownMenuWrapper({ children, ...props }) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
}
