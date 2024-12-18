import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export function LanguageSettings() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Language</h3>
      <Select onValueChange={(value) => console.log("Language selected:", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}