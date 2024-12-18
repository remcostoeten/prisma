import { motion } from "framer-motion";
import { ThemeSettings } from "./theme-settings";
import { AccentColorSettings } from "./accent-color-settings";
import { SidebarSettings } from "./sidebar-settings";

export function AppearanceSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-6">Appearance</h2>
        <div className="space-y-6">
          <ThemeSettings />
          <AccentColorSettings />
          <SidebarSettings />
        </div>
      </motion.div>
    </div>
  );
}