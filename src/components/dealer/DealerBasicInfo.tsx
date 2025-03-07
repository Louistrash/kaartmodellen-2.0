import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Users } from "lucide-react";
import { DealerFormState } from "./DealerFormTypes";

interface DealerBasicInfoProps {
  formState: DealerFormState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export function DealerBasicInfo({
  formState,
  onInputChange,
  onSelectChange,
}: DealerBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Dealer Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter dealer name"
          value={formState.name}
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender">Dealer Gender</Label>
        <Select
          value={formState.gender}
          onValueChange={(value) => onSelectChange("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select dealer gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" /> Female
              </div>
            </SelectItem>
            <SelectItem value="male">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Male
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Determines the appearance of the generated dealer
        </p>
      </div>
    </div>
  );
}
