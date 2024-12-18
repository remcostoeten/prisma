import { motion } from "framer-motion";
import { NotificationSettings } from "./notification-settings";

export function NotificationsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          <NotificationSettings />
        </div>
      </div>
    </motion.div>
  );
}