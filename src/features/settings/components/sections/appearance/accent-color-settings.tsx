import { motion } from "framer-motion";
import { useThemePreferences } from "@/features/theme-two/hooks/use-theme-preferences";
import { accentColors } from "@/features/theme-two/constants";
import { cn } from "@/shared/lib/utils";

export function AccentColorSettings() {
  const { preferences, updatePreferences } = useThemePreferences();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Accent Color</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred accent color
        </p>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {accentColors.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updatePreferences({ accentColor: color.value })}
            className={cn(
              "w-8 h-8 rounded-full relative group",
              preferences.accentColor === color.value && "ring-2 ring-primary/30 ring-offset-2"
            )}
          >
            <span className={cn(
              "absolute inset-0 rounded-full",
              color.class
            )} />
            <span className="sr-only">{color.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
