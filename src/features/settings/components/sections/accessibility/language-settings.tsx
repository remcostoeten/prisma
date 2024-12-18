import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export function LanguageSettings() {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Language</h3>
      <p className="text-sm text-muted-foreground">
        Choose your preferred language.
      </p>
      <Select onValueChange={(value) => console.log("Language selected:", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}