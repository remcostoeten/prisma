'use client';

import { useState } from 'react';
import { useKeyboardShortcuts, type KeyboardShortcut } from '../../../stores/keyboard-shortcuts.store';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export function KeyboardShortcutEditor() {
  const { shortcuts, updateShortcut, resetShortcut, resetAllShortcuts } = useKeyboardShortcuts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [recordingKeys, setRecordingKeys] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key === ' ' ? 'Space' : e.key;
    if (!recordingKeys.includes(key)) {
      setRecordingKeys([...recordingKeys, key]);
    }
  };

  const handleKeyUp = (shortcut: KeyboardShortcut) => {
    if (recordingKeys.length > 0) {
      updateShortcut(shortcut.id, recordingKeys);
      setRecordingKeys([]);
      setEditingId(null);
    }
  };

  const startRecording = (id: string) => {
    setEditingId(id);
    setRecordingKeys([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={resetAllShortcuts}
          className="text-sm"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset All
        </Button>
      </div>

      <div className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            className="flex items-center justify-between rounded-lg border bg-background p-2"
          >
            <div>
              <h4 className="text-sm font-medium">{shortcut.name}</h4>
              <p className="text-xs text-muted-foreground">{shortcut.description}</p>
            </div>

            <div className="flex items-center gap-2">
              {editingId === shortcut.id ? (
                <Input
                  value={recordingKeys.join(' + ')}
                  placeholder="Type shortcut..."
                  className="w-40 text-center"
                  onKeyDown={handleKeyDown}
                  onKeyUp={() => handleKeyUp(shortcut)}
                  autoFocus
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startRecording(shortcut.id)}
                  className={cn(
                    "min-w-[160px] justify-center",
                    shortcut.currentKeys.join('+') !== shortcut.defaultKeys.join('+') && "border-primary"
                  )}
                >
                  {shortcut.currentKeys.join(' + ')}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => resetShortcut(shortcut.id)}
                disabled={shortcut.currentKeys.join('+') === shortcut.defaultKeys.join('+')}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
