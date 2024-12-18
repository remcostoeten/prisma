import { SettingsSection } from "../types";
import { AccessibilitySection } from "./accessibility/accessibility-section";
import { AppearanceSection } from "./appearance/appearance-section";

interface SettingsContentProps {
  section: SettingsSection;
}

export function SettingsContent({ section }: SettingsContentProps) {
  const sections: Record<SettingsSection, React.ReactNode> = {
    accessibility: <AccessibilitySection />,
    appearance: <AppearanceSection />,
    general: <ComingSoon section="general" />,
    account: <ComingSoon section="account" />,
    storage: <ComingSoon section="storage" />,
    links: <ComingSoon section="links" />,
    hotkeys: <ComingSoon section="hotkeys" />,
    integrations: <ComingSoon section="integrations" />,
    billing: <ComingSoon section="billing" />,
    help: <ComingSoon section="help" />,
  };

  return sections[section];
}

function ComingSoon({ section }: { section: string }) {
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      {section} settings coming soon...
    </div>
  );
}