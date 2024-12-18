import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RotateCcw } from "lucide-react";

export function KeyboardShortcutEditor() {
  const shortcuts = [
    {
      name: "Toggle Settings",
      keys: "Ctrl + ,",
      description: "Open settings dialog"
    },
    {
      name: "Toggle Theme",
      keys: "Ctrl + T",
      description: "Switch between light and dark mode"
    },
    {
      name: "Quick Search",
      keys: "Ctrl + K",
      description: "Open search dialog"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Enable enhanced keyboard navigation
          </p>
        </div>
        <Switch />
      </div>

      <div className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.name}
            className="flex items-center justify-between p-2 rounded-lg border bg-card"
          >
            <div>
              <h4 className="text-sm font-medium">{shortcut.name}</h4>
              <p className="text-xs text-muted-foreground">{shortcut.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={shortcut.keys}
                className="w-32 text-center"
                readOnly
              />
              <Button variant="ghost" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}