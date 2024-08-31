import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@55lbs/components';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export function OutdatedBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="destructive">Outdated</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>+90 days outdated</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
