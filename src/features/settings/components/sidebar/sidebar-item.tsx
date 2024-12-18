import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function SidebarItem({ icon: Icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm rounded-md relative",
        "hover:bg-accent/50 hover:text-accent-foreground",
        "transition-colors duration-200",
        active && "text-primary"
      )}
    >
      {active && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 border border-primary/30 bg-primary/10 rounded-md"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <Icon className="h-4 w-4 relative z-10" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}