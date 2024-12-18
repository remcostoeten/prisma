'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { AppearanceSection } from './sections/appearance-section';
import { NotificationsSection } from './sections/notifications-section';
import { AccountSection } from './sections/account-section';
import { motion } from 'framer-motion';
import { useAppearanceStore } from '@/stores/appearance.store';
import { cn } from '@/shared/lib/utils';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { modalOpacity, modalBlur } = useAppearanceStore();

  const glassStyle = {
    backgroundColor: `rgba(var(--background-rgb), ${modalOpacity / 100})`,
    backdropFilter: `blur(${modalBlur}px)`,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[600px] transition-all duration-200",
          "border border-border/50"
        )}
        style={glassStyle}
      >
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <TabsContent value="appearance">
              <AppearanceSection />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsSection />
            </TabsContent>
            <TabsContent value="account">
              <AccountSection />
            </TabsContent>
          </motion.div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
