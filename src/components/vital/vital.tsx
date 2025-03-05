import { cn } from "@/lib/utils";

interface VitalProps {
  icon?: React.JSX.Element;
  name: string;
  vital?: string;
  children?: React.ReactNode | null;
  className?: string;
}
function Vital({ icon, name, vital, children, className }: VitalProps) {
  return (
    <li title={name} className={cn(`flex flex-col items-center ${className}`)}>
      {icon}
      {vital}
      {children}
    </li>
  );
}

export default Vital;
