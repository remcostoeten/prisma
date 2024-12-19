'use client';

import { useSettingsStore } from '@/stores/settings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function AccountSection() {
  const { profile, updateProfile, isLoading } = useSettingsStore();
  const [localProfile, setLocalProfile] = useState(profile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(localProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <Input
            value={localProfile.firstName}
            onChange={(e) => setLocalProfile({ ...localProfile, firstName: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Last Name</label>
          <Input
            value={localProfile.lastName}
            onChange={(e) => setLocalProfile({ ...localProfile, lastName: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={localProfile.email}
          onChange={(e) => setLocalProfile({ ...localProfile, email: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Language</label>
        <Select
          value={localProfile.settings.language}
          onValueChange={(value: any) =>
            setLocalProfile({
              ...localProfile,
              settings: { ...localProfile.settings, language: value },
            })
          }
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
