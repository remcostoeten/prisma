import { LogOut, SwitchCamera } from "lucide-react";

export function SidebarFooter() {
  return (
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
  );
}