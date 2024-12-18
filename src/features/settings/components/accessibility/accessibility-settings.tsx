import { Switch } from "@/shared/components/ui/switch";

export function AccessibilitySettings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">High Contrast Mode</h3>
          <p className="text-sm text-muted-foreground">
            Toggle switch to enable high contrast mode.
          </p>
        </div>
        <Switch onCheckedChange={(checked) => console.log("High contrast:", checked)} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Underline Links</h3>
            <p className="text-sm text-muted-foreground">
              Make links to websites, help articles, and other pages stand out more by underlining them.
            </p>
          </div>
          <Switch onCheckedChange={(checked) => console.log("Underline links:", checked)} />
        </div>
        <div className="mt-2 p-2 bg-muted rounded-md">
          <p className="text-sm">Your links will look like: <a href="#" className="text-primary underline">https://example.com/accessibility</a></p>
        </div>
      </div>
    </>
  );
}