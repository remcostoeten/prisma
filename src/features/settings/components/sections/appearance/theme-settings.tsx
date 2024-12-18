import { useThemePreferences } from "@/features/theme-two/hooks/use-theme-preferences";
import { themes } from "@/features/theme-two/types";
import { cn } from "@/shared/lib/utils";
import { Monitor, Moon, Sun, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSettings() {
  const { preferences, updatePreferences, resolvedTheme } = useThemePreferences();
  const actualTheme = preferences.theme === "system" ? resolvedTheme : preferences.theme;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred theme
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updatePreferences({ theme: key as keyof typeof themes })}
            className={cn(
              "group relative flex flex-col rounded-lg border transition-all overflow-hidden",
              preferences.theme === key
                ? "border-primary/30 bg-primary/5"
                : "border-border hover:border-primary/20 hover:bg-primary/5"
            )}
          >
            {/* Preview Window */}
            <div className="relative aspect-[1.6] w-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: theme.preview.background }}
              >
                {/* Toolbar */}
                <div
                  className="h-6 w-full flex items-center px-2"
                  style={{ backgroundColor: theme.preview.toolbar }}
                >
                  <div className="flex gap-1.5">
                    <div className="rounded-full h-2 w-2 bg-[#ff5f57]" />
                    <div className="rounded-full h-2 w-2 bg-[#febc2e]" />
                    <div className="rounded-full h-2 w-2 bg-[#28c840]" />
                  </div>
                </div>

                {/* Content Preview */}
                <div className="p-3 space-y-2">
                  {/* Command Line */}
                  <div
                    className="flex items-center gap-2 font-mono text-xs"
                    style={{ color: theme.preview.text }}
                  >
                    <span>$</span>
                    <span style={{ color: theme.preview.accent }}>npm</span>
                    <span>run dev</span>
                  </div>

                  {/* Code Preview */}
                  <div className="space-y-1">
                    <div
                      className="h-2 w-3/4 rounded"
                      style={{ backgroundColor: `${theme.preview.text}20` }}
                    />
                    <div
                      className="h-2 w-1/2 rounded"
                      style={{ backgroundColor: `${theme.preview.text}15` }}
                    />
                    <div
                      className="h-2 w-2/3 rounded"
                      style={{ backgroundColor: `${theme.preview.text}10` }}
                    />
                  </div>

                  {/* Accent Color Preview */}
                  <div
                    className="h-2 w-1/3 rounded mt-3"
                    style={{ backgroundColor: theme.preview.accent }}
                  />
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="p-3 flex items-center justify-between">
              <span className={cn(
                "text-sm font-medium",
                preferences.theme === key
                  ? "text-primary"
                  : "text-foreground"
              )}>
                {theme.name}
              </span>
              {key === 'light' ? <Sun className="w-4 h-4" /> :
                key === 'dark' ? <Moon className="w-4 h-4" /> :
                  <Terminal className="w-4 h-4" />}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
