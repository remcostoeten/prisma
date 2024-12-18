import { Switch } from "@/shared/components/ui/switch";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Receive email updates about your account
          </p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Push Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Receive push notifications in your browser
          </p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Desktop Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Show notifications on your desktop
          </p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Sound Effects</h3>
          <p className="text-sm text-muted-foreground">
            Play sounds for notifications and actions
          </p>
        </div>
        <Switch />
      </div>
    </div>
  );
}