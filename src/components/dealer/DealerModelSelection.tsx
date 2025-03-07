import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_MODELS } from "./DealerFormTypes";
import { DealerFormState } from "./DealerFormTypes";

interface DealerModelSelectionProps {
  formState: DealerFormState;
  onSelectChange: (name: string, value: string) => void;
}

export function DealerModelSelection({
  formState,
  onSelectChange,
}: DealerModelSelectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="model">AI Image Model</Label>
      <Select
        value={formState.model}
        onValueChange={(value) => onSelectChange("model", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select AI model" />
        </SelectTrigger>
        <SelectContent>
          {AI_MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground mt-1">
        This determines which AI service will generate dealer images
      </p>
    </div>
  );
}
