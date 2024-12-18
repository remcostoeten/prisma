"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";

type SettingsSection = 'appearance' | 'theme' | 'integrations';

export type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSection?: SettingsSection;
};

export default function SettingsDialog({
  open,
  onOpenChange,
  defaultSection = "appearance"
}: SettingsDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState<SettingsSection>(defaultSection);
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("settings");
      router.push(`/?${params.toString()}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        handleOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        handleOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleOpenChange]);

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex gap-0 p-0",
          "max-w-4xl mx-auto my-4 min-w-[800px] min-h-[600px]",
          "rounded-lg border border-border/50"
        )}
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <div className="w-[200px] border-r border-border/50 p-4 space-y-2">
          {['Appearance', 'Theme', 'Integrations'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveItem(item.toLowerCase() as SettingsSection)}
              className={cn(
                "w-full px-4 py-2 text-sm rounded-md text-left transition-colors",
                activeItem === item.toLowerCase()
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex-1 p-6 overflow-y-auto max-h-[calc(100dvh-8rem)]">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-3 text-foreground/80">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    currentTheme === 'light'
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80"
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    currentTheme === 'dark'
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80"
                  )}
                >
                  Dark
                </button>
              </div>
            </div>

            <Separator className="bg-border/40" />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground/80">Animations</h3>
                <p className="text-sm text-muted-foreground">
                  Enable or disable animations
                </p>
              </div>
              <Switch
                checked={true}
                onCheckedChange={() => { }}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
