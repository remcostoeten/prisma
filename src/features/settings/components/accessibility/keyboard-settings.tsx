import { Button } from "@/shared/components/ui/button";

export function KeyboardSettings() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">Keyboard Shortcuts</h3>
        <p className="text-sm text-muted-foreground">
          View and customize existing shortcuts.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={() => console.log("Manage shortcuts")}>
        Manage
      </Button>
    </div>
  );
}