import { motion } from "framer-motion";
import { Switch } from "@/shared/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export function GeneralSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold mb-6">General Settings</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Start on System Startup</h3>
              <p className="text-sm text-muted-foreground">
                Automatically start the application when you log in
              </p>
            </div>
            <Switch onCheckedChange={(checked) => console.log("Auto start:", checked)} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Default View</h3>
            <Select onValueChange={(value) => console.log("Default view:", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select default view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="files">Files</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Automatic Updates</h3>
              <p className="text-sm text-muted-foreground">
                Keep the application up to date automatically
              </p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => console.log("Auto update:", checked)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}