import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PERSONALITY_TYPES } from "./DealerFormTypes";
import { DealerFormState } from "./DealerFormTypes";

interface DealerPersonalityProps {
  formState: DealerFormState;
  onSelectChange: (name: string, value: string) => void;
}

export function DealerPersonality({
  formState,
  onSelectChange,
}: DealerPersonalityProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="personality">Personality Type</Label>
      <Select
        value={formState.personality}
        onValueChange={(value) => onSelectChange("personality", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select personality type" />
        </SelectTrigger>
        <SelectContent>
          {PERSONALITY_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
