import { Switch } from "@/shared/components/ui/switch";

export function NotificationSettings() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Allow notification reports when new messages or updates arrive.
        </p>
      </div>
      <Switch onCheckedChange={(checked) => console.log("Notifications:", checked)} />
    </div>
  );
}