import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/is-mobile";

interface VitalProps {
  icon?: React.JSX.Element;
  name: string;
  vital?: string;
  children?: React.ReactNode | null;
  className?: string;
}
function Vital({ icon, name, vital, children, className }: VitalProps) {
  const [showToolTip, setShowToolTip] = useState(false);
  const isMobile = useIsMobile();
  const vitalRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        vitalRef.current &&
        !vitalRef.current.contains(event.target as Node)
      ) {
        setShowToolTip(false); // Close the tooltip
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <TooltipProvider>
      <Tooltip open={showToolTip}>
        <TooltipTrigger
          asChild
          onMouseEnter={() => !isMobile && setShowToolTip(true)}
          onMouseLeave={() => !isMobile && setShowToolTip(false)}
          onClick={() => setShowToolTip((prev) => !prev)}
        >
          <li
            ref={vitalRef}
            className={cn(`flex flex-col items-center ${className}`)}
          >
            {icon}
            {vital}
            {children}
          </li>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Vital;
