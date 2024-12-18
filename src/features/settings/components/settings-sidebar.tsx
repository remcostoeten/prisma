import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { Settings, User, Palette, HardDrive, Link, Keyboard, Globe, CreditCard, HelpCircle, LogOut, SwitchCamera } from "lucide-react";
import { SettingsSection } from "../types";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const sidebarItems = [
  { id: "general" as const, label: "General", icon: Settings },
  { id: "account" as const, label: "My Account", icon: User },
  { id: "appearance" as const, label: "Appearance", icon: Palette },
  { id: "accessibility" as const, label: "Accessibility", icon: Globe },
  { id: "storage" as const, label: "Storage", icon: HardDrive },
  { id: "links" as const, label: "Files and Links", icon: Link },
  { id: "hotkeys" as const, label: "Hotkeys", icon: Keyboard },
  { id: "integrations" as const, label: "Integrations", icon: Globe },
  { id: "billing" as const, label: "Billing", icon: CreditCard },
  { id: "help" as const, label: "Help Center", icon: HelpCircle },
] as const;

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-muted/50">
      <div className="flex flex-col gap-1 p-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md relative",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors duration-200",
              activeSection === item.id && "text-primary"
            )}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 bg-accent rounded-md"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <item.icon className="h-4 w-4" />
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-border mt-2">
        <div className="flex flex-col gap-1 p-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <SwitchCamera className="h-4 w-4" />
            <span>Switch Account</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}