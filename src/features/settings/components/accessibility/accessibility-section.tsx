import { motion } from "framer-motion";
import { NotificationSettings } from "./notification-settings";
import { InterfaceSettings } from "./interface-settings";
import { AccessibilitySettings } from "./accessibility-settings";
import { KeyboardSettings } from "./keyboard-settings";
import { LanguageSettings } from "./language-settings";

export function AccessibilitySection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-6">Accessibility</h2>
        <div className="space-y-4">
          <NotificationSettings />
          <InterfaceSettings />
          <AccessibilitySettings />
          <KeyboardSettings />
          <LanguageSettings />
        </div>
      </motion.div>
    </div>
  );
}