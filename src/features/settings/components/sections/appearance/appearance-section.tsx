import { motion } from "framer-motion";
import { ThemeSettings } from "./theme-settings";
import { GlassEffectControls } from "./glass-effect-controls";
import { AccentColorSettings } from "./accent-color-settings";
import { Separator } from "@/shared/components/ui/separator";

export function AppearanceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-6">Appearance</h2>
        <div className="space-y-6">
          <ThemeSettings />
          <Separator />
          <AccentColorSettings />
          <Separator />
          <GlassEffectControls />
        </div>
      </div>
    </motion.div>
  );
}