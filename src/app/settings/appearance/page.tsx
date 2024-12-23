import { ThemeSelector } from '@/features/settings/components/theme-selector'

export default function AppearancePage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="mb-8 text-2xl font-semibold">Appearance Settings</h1>
      <div className="space-y-8">
        <ThemeSelector />
      </div>
    </div>
  )
}
